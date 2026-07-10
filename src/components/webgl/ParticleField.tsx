"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute float a_size;
  attribute float a_phase;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  varying float v_alpha;
  varying float v_dist;

  void main() {
    vec2 pos = a_position;
    vec2 mouseNorm = u_mouse / u_resolution;
    vec2 posNorm = pos / u_resolution;
    float dist = distance(posNorm, mouseNorm);
    float ripple = sin(dist * 28.0 - u_time * 3.5) * exp(-dist * 5.5) * 0.12;
    float push = exp(-dist * 4.0) * 0.18;
    vec2 dir = normalize(posNorm - mouseNorm + 0.0001);
    posNorm += dir * push;
    posNorm += ripple * vec2(cos(a_phase), sin(a_phase));
    vec2 clip = (posNorm * 2.0 - 1.0) * vec2(1.0, -1.0);
    gl_Position = vec4(clip, 0.0, 1.0);
    gl_PointSize = a_size * (1.0 + push * 3.0);
    v_alpha = 0.35 + push * 0.65;
    v_dist = dist;
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform vec3 u_cyan;
  varying float v_alpha;
  varying float v_dist;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float d = length(coord);
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);
    float aura = exp(-v_dist * 3.0) * 0.4;
    vec3 color = u_cyan * (glow + aura);
    gl_FragColor = vec4(color, (glow + aura * 0.5) * v_alpha);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vs || !fs) return null;
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const program = createProgram(gl);
    if (!program) return;

    const PARTICLE_COUNT = 2400;
    const positions = new Float32Array(PARTICLE_COUNT * 2);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 2] = Math.random() * canvas.width;
      positions[i * 2 + 1] = Math.random() * canvas.height;
      sizes[i] = 1.2 + Math.random() * 2.8;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const posBuffer = gl.createBuffer();
    const sizeBuffer = gl.createBuffer();
    const phaseBuffer = gl.createBuffer();

    const aPosition = gl.getAttribLocation(program, "a_position");
    const aSize = gl.getAttribLocation(program, "a_size");
    const aPhase = gl.getAttribLocation(program, "a_phase");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uCyan = gl.getUniformLocation(program, "u_cyan");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        if (positions[i * 2] > canvas.width) positions[i * 2] = Math.random() * canvas.width;
        if (positions[i * 2 + 1] > canvas.height) positions[i * 2 + 1] = Math.random() * canvas.height;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      mouseRef.current = { x: e.clientX * dpr, y: e.clientY * dpr };
    };
    window.addEventListener("mousemove", onMouseMove);

    let startTime = performance.now();
    let lastFrame = startTime;

    const render = (now: number) => {
      const delta = now - lastFrame;
      if (delta >= 16) {
        lastFrame = now - (delta % 16);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        gl.useProgram(program);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
        gl.uniform1f(uTime, (now - startTime) / 1000);
        gl.uniform3f(uCyan, 0.0, 0.949, 0.996);

        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(aSize);
        gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, phaseBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, phases, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(aPhase);
        gl.vertexAttribPointer(aPhase, 1, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
