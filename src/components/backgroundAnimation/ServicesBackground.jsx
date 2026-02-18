'use client';

import { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

export default function ServicesBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Particle class for services theme (red/orange)
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 40 + 30;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.01;
                this.opacity = Math.random() * 0.2 + 0.05;
                this.type = Math.floor(Math.random() * 3);
                this.hue = Math.random() * 30; // Red to orange range (0-30)
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotation += this.rotationSpeed;

                if (this.x > canvas.width + 100) this.x = -100;
                if (this.x < -100) this.x = canvas.width + 100;
                if (this.y > canvas.height + 100) this.y = -100;
                if (this.y < -100) this.y = canvas.height + 100;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.globalAlpha = this.opacity;

                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
                gradient.addColorStop(0, `hsla(${this.hue}, 85%, 60%, 0.3)`);
                gradient.addColorStop(0.5, `hsla(${this.hue}, 75%, 50%, 0.15)`);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = gradient;
                ctx.strokeStyle = `hsla(${this.hue}, 85%, 60%, 0.1)`;
                ctx.lineWidth = 1;

                if (this.type === 0) {
                    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                    ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
                } else if (this.type === 1) {
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size / 2);
                    ctx.lineTo(this.size / 2, this.size / 2);
                    ctx.lineTo(-this.size / 2, this.size / 2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                }

                ctx.restore();
            }
        }

        // Initialize particles
        const initParticles = () => {
            particles = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 18000);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        initParticles();

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="animated-background">
            <canvas ref={canvasRef} className="background-canvas" />
            <div className="background-gradient" />
        </div>
    );
}
