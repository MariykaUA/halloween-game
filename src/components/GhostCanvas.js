// src/components/GhostCanvas.js
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const GhostCanvas = () => {
  const canvasRef = useRef(); // Create a reference for the canvas

  useEffect(() => {
    const sketch = (p) => {
      let ghosts = [];

      class Ghost {
        constructor() {
          this.tail = [];
          this.tailLength = 30;
          this.ghostSize = p.random(30, 100);
          this.ghostX = p.random(p.windowWidth);
          this.ghostY = p.random(p.windowHeight);
          this.cosOffset = p.random(100);
          this.wiggliness = p.random(2, 10);
          this.floatiness = p.random(2, 10);
          this.r = p.random(255);
          this.g = p.random(255);
          this.b = p.random(255);
        }

        moveAndDraw() {
          this.ghostX += p.cos((this.cosOffset + p.frameCount) / 10) * this.wiggliness;
          this.ghostY -= this.floatiness;

          if (this.ghostY < -this.ghostSize) {
            this.ghostY = p.height + this.ghostSize;
          }

          this.tail.unshift({ x: this.ghostX, y: this.ghostY });
          if (this.tail.length > this.tailLength) {
            this.tail.pop();
          }

          for (let index = 0; index < this.tail.length; index++) {
            const tailPoint = this.tail[index];
            const pointSize = this.ghostSize * (this.tail.length - index) / this.tail.length;
            const pointAlpha = 255 * (this.tail.length - index) / this.tail.length;
            p.fill(this.r, this.g, this.b, pointAlpha);
            p.ellipse(tailPoint.x, tailPoint.y, pointSize);
          }

          p.fill(32);
          p.ellipse(this.ghostX - this.ghostSize * 0.2, this.ghostY - this.ghostSize * 0.1, this.ghostSize * 0.2);
          p.ellipse(this.ghostX + this.ghostSize * 0.2, this.ghostY - this.ghostSize * 0.1, this.ghostSize * 0.2);
          p.ellipse(this.ghostX, this.ghostY + this.ghostSize * 0.2, this.ghostSize * 0.2);
        }
      }

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current); // Attach canvas to the ref
        for (let i = 0; i < 16; i++) {
          ghosts.push(new Ghost());
        }
        p.noStroke();
      };

      p.draw = () => {
        p.background(130);
        for (const ghost of ghosts) {
          ghost.moveAndDraw();
        }
      };
    };

    const myP5 = new p5(sketch);

    return () => {
      myP5.remove(); // Clean up on unmount
    };
  }, []);

  return <div ref={canvasRef} className="canvas-container" />; // Use the ref to attach the canvas
};

export default GhostCanvas;
