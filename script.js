// Initialize Lucide Icons
    lucide.createIcons();

    /* ---------- AUDIO GENERATOR SYSTEM (WEB AUDIO API) ---------- */
    let soundEnabled = false;
    const soundToggle = document.getElementById('sound-toggle');
    
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      const icon = soundToggle.querySelector('i');
      if (soundEnabled) {
        soundToggle.style.color = 'var(--primary)';
        soundToggle.style.borderColor = 'var(--primary)';
        icon.setAttribute('data-lucide', 'volume-2');
        playAudioFeedback(900, 0.06, 0.015);
      } else {
        soundToggle.style.color = 'var(--muted)';
        soundToggle.style.borderColor = 'var(--border)';
        icon.setAttribute('data-lucide', 'volume-x');
      }
      lucide.createIcons();
    });

    function playAudioFeedback(freq = 800, duration = 0.05, volume = 0.01) {
      if (!soundEnabled) return;
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration + 0.01);
      } catch (e) {
        // Safe fail if audio blocked
      }
    }

    // Attach click and hover audio feedback
    document.querySelectorAll('a, button, .tilt-card, .about-focus-card, .cert-item, .achieve-card, .pinned-repo').forEach(el => {
      el.addEventListener('mouseenter', () => playAudioFeedback(1100, 0.03, 0.006));
      el.addEventListener('click', () => playAudioFeedback(850, 0.08, 0.015));
    });

    /* ---------- DYNAMIC LOADING SCREEN ---------- */
    window.addEventListener('DOMContentLoaded', () => {
      const loader = document.getElementById('loader');
      const pctText = document.querySelector('.loader-pct');
      const bar = document.querySelector('.loader-progress');
      const statusText = document.querySelector('.loader-status');

      const statusMessages = [
        'INITIALIZING CORE CONFIGS...',
        'CONNECTING DATABASES...',
        'RENDERING COMPILERS...',
        'COMPILING PORTFOLIO MODULES...',
        'STABILIZING GRAPHICS PIPELINE...',
        'SYSTEM ONLINE'
      ];

      let progress = 0;
      const loaderInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 4;
        if (progress >= 100) {
          progress = 100;
          clearInterval(loaderInterval);
          pctText.textContent = '100%';
          bar.style.width = '100%';
          statusText.textContent = statusMessages[statusMessages.length - 1];

          setTimeout(() => {
            loader.classList.add('loaded');
            // Trigger skill bars animations
            animateSkills();
          }, 300);
        } else {
          pctText.textContent = `${progress}%`;
          bar.style.width = `${progress}%`;
          
          const step = Math.floor(100 / (statusMessages.length - 1));
          const idx = Math.floor(progress / step);
          if (idx < statusMessages.length - 1) {
            statusText.textContent = statusMessages[idx];
          }
        }
      }, 45);
    });

    /* ---------- CUSTOM MOUSE CURSOR & GLOW ---------- */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const mouseGlow = document.querySelector('.mouse-glow');

    let mX = 0, mY = 0;
    let dotX = 0, dotY = 0;
    let outX = 0, outY = 0;

    window.addEventListener('mousemove', (e) => {
      mX = e.clientX;
      mY = e.clientY;

      if (mouseGlow) {
        mouseGlow.style.transform = `translate3d(${mX - 150}px, ${mY - 150}px, 0)`;
      }
    });

    function updateCursorAnimation() {
      dotX += (mX - dotX) * 0.22;
      dotY += (mY - dotY) * 0.22;

      outX += (mX - outX) * 0.12;
      outY += (mY - outY) * 0.12;

      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      }
      if (cursorOutline) {
        cursorOutline.style.transform = `translate3d(${outX}px, ${outY}px, 0)`;
      }

      requestAnimationFrame(updateCursorAnimation);
    }
    updateCursorAnimation();

    // Link hover modifications
    document.querySelectorAll('a, button, .interactive-card, .tilt-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hover');
        cursorOutline.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hover');
        cursorOutline.classList.remove('hover');
      });
    });

    /* ---------- SCROLL PROGRESS INDICATOR ---------- */
    window.addEventListener('scroll', () => {
      const topbarProgress = document.querySelector('.scroll-progress');
      if (topbarProgress) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        topbarProgress.style.width = `${percent}%`;
      }
    });

    /* ---------- REVEAL ON SCROLL ---------- */
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ---------- ANIMATED STATISTICS COUNTERS ---------- */
    const statsGrid = document.querySelector('.hero-stats');
    const statCounters = document.querySelectorAll('.stat-count');
    let statsAnimated = false;

    function countUpStats() {
      statCounters.forEach(cnt => {
        const target = parseInt(cnt.getAttribute('data-target'));
        const duration = 1600;
        const startTimestamp = performance.now();

        function step(timestamp) {
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          // Ease-out quad formula
          const ease = progress * (2 - progress);
          const current = Math.floor(ease * target);
          cnt.textContent = `${current}+`;

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            cnt.textContent = `${target}+`;
          }
        }
        requestAnimationFrame(step);
      });
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !statsAnimated) {
          countUpStats();
          statsAnimated = true;
          statsObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });

    if (statsGrid) statsObserver.observe(statsGrid);

    /* ---------- TIMELINE PROGRESS SCROLL ---------- */
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.querySelector('.timeline-progress');

    window.addEventListener('scroll', () => {
      if (!timelineContainer) return;
      
      const containerRect = timelineContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far down the timeline container is scrolled relative to view
      const start = containerRect.top;
      const total = containerRect.height;
      const scrolled = Math.max(0, Math.min(1, (windowHeight / 2 - start) / total));
      
      if (timelineProgress) {
        timelineProgress.style.height = `${scrolled * 100}%`;
      }

      // Activate active items
      timelineItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < windowHeight * 0.65) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });

    /* ---------- CARD 3D TILT EFFECT & BORDER MOUSE TRACKING ---------- */
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Save coordinates as CSS variables for the paint background highlight
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);

        // Compute angle offsets for 3D tilt
        const halfW = rect.width / 2;
        const halfH = rect.height / 2;
        const angleX = (halfH - y) / 14;
        const angleY = (x - halfW) / 14;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });

    /* ---------- MAGNETIC BUTTONS ---------- */
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Move the button itself
        btn.style.transform = `translate3d(${x * 0.28}px, ${y * 0.28}px, 0)`;

        // Shift inner text/icon content slightly less for a parallax effect
        const content = btn.querySelector('.btn-content');
        if (content) {
          content.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
        }
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
        const content = btn.querySelector('.btn-content');
        if (content) {
          content.style.transform = 'translate3d(0, 0, 0)';
        }
      });
    });

    /* ---------- NEURAL NETWORK CANVAS ANIMATION ---------- */
    const neuralCanvas = document.getElementById('neural-net-canvas');
    if (neuralCanvas) {
      const nCtx = neuralCanvas.getContext('2d');
      let nodes = [];
      let maxDist = 95;
      let width = 0;
      let height = 0;

      function resizeNeuralCanvas() {
        width = neuralCanvas.parentElement.offsetWidth;
        height = neuralCanvas.parentElement.offsetHeight;
        neuralCanvas.width = width;
        neuralCanvas.height = height;
      }
      
      resizeNeuralCanvas();
      window.addEventListener('resize', resizeNeuralCanvas);

      class NeuralNode {
        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.vx = (Math.random() - 0.5) * 0.45;
          this.vy = (Math.random() - 0.5) * 0.45;
          this.radius = Math.random() * 2 + 1.5;
          this.pulseSpeed = Math.random() * 0.03 + 0.01;
          this.pulseVal = Math.random();
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.pulseVal += this.pulseSpeed;

          // Bounce off edges
          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;
          
          this.x = Math.max(0, Math.min(width, this.x));
          this.y = Math.max(0, Math.min(height, this.y));
        }

        draw() {
          nCtx.beginPath();
          const opacity = 0.35 + Math.abs(Math.sin(this.pulseVal)) * 0.45;
          nCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          nCtx.fillStyle = `rgba(255, 77, 94, ${opacity})`;
          nCtx.fill();
        }
      }

      // Initialize nodes
      const nodeCount = 38;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new NeuralNode());
      }

      // Mouse interactive node
      let mouseNode = { x: null, y: null };
      const container = neuralCanvas.parentElement;
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseNode.x = e.clientX - rect.left;
        mouseNode.y = e.clientY - rect.top;
      });

      container.addEventListener('mouseleave', () => {
        mouseNode.x = null;
        mouseNode.y = null;
      });

      function animateNeuralNet() {
        nCtx.clearRect(0, 0, width, height);

        // Update & Draw nodes
        nodes.forEach(node => {
          node.update();
          node.draw();
        });

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
          const n1 = nodes[i];
          
          // Connect to other nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
            
            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.16;
              nCtx.beginPath();
              nCtx.moveTo(n1.x, n1.y);
              nCtx.lineTo(n2.x, n2.y);
              nCtx.strokeStyle = `rgba(255, 77, 94, ${alpha})`;
              nCtx.lineWidth = 0.8;
              nCtx.stroke();
            }
          }

          // Connect to mouse
          if (mouseNode.x !== null && mouseNode.y !== null) {
            const mDist = Math.hypot(n1.x - mouseNode.x, n1.y - mouseNode.y);
            if (mDist < 120) {
              const alpha = (1 - mDist / 120) * 0.38;
              nCtx.beginPath();
              nCtx.moveTo(n1.x, n1.y);
              nCtx.lineTo(mouseNode.x, mouseNode.y);
              nCtx.strokeStyle = `rgba(255, 77, 94, ${alpha})`;
              nCtx.lineWidth = 1.0;
              nCtx.stroke();
            }
          }
        }

        requestAnimationFrame(animateNeuralNet);
      }
      
      animateNeuralNet();
    }

    /* ---------- TERMINAL LOGIC SYSTEM ---------- */
    const terminalBody = document.getElementById('terminal-body');
    if (terminalBody) {
      const logs = [
        { text: '$ python train_agent.py', type: 'command' },
        { text: 'Initializing neural pipeline...', type: 'output' },
        { text: 'Loading training weights: [====================] 100%', type: 'success' },
        { text: 'Model training initialized.', type: 'output' },
        { text: 'Epoch 1/100 - Loss: 0.814 - Acc: 74.2%', type: 'info' },
        { text: 'Epoch 25/100 - Loss: 0.298 - Acc: 91.8%', type: 'info' },
        { text: 'Epoch 50/100 - Loss: 0.124 - Acc: 96.5%', type: 'info' },
        { text: 'Epoch 75/100 - Loss: 0.052 - Acc: 98.9%', type: 'info' },
        { text: 'Epoch 100/100 - Loss: 0.024 - Acc: 99.4%', type: 'success' },
        { text: 'Model exported: ./weights/agent.pt (Size: 42.1MB)', type: 'output' },
        { text: '$ uvicorn main:app --reload --port 8000', type: 'command' },
        { text: 'INFO:     Started server process [18432]', type: 'info' },
        { text: 'INFO:     Waiting for application startup.', type: 'info' },
        { text: 'INFO:     Application startup complete.', type: 'success' },
        { text: 'INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)', type: 'success' }
      ];

      let logIndex = 0;

      function addTerminalLine() {
        if (logIndex >= logs.length) {
          // Clear and restart simulation after a delay
          setTimeout(() => {
            terminalBody.innerHTML = '';
            logIndex = 0;
            addTerminalLine();
          }, 4000);
          return;
        }

        const log = logs[logIndex];
        const line = document.createElement('div');
        line.className = 'terminal-line';

        if (log.type === 'command') {
          line.innerHTML = `<span class="prompt">$</span> ${log.text.slice(2)}`;
        } else if (log.type === 'success') {
          line.className = 'terminal-line text-success';
          line.textContent = log.text;
        } else if (log.type === 'info') {
          line.className = 'terminal-line text-glow';
          line.textContent = log.text;
        } else {
          line.className = 'terminal-line text-muted';
          line.textContent = log.text;
        }

        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
        logIndex++;

        // Determine delay for next command (commands take longer, outputs are fast)
        const nextDelay = log.type === 'command' ? 1800 : (Math.random() * 500 + 400);
        setTimeout(addTerminalLine, nextDelay);
      }

      // Start the terminal log simulator
      terminalBody.innerHTML = '';
      setTimeout(addTerminalLine, 1000);
    }

    /* ---------- TECH SKILLS ANIMATION ---------- */
    const skillsGrid = document.querySelector('.skills-grid');
    const skillBars = document.querySelectorAll('.skill-bar-fg');
    let skillsAnimated = false;

    function animateSkills() {
      if (skillsAnimated) return;
      skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
      });
      skillsAnimated = true;
    }

    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateSkills();
          skillsObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    if (skillsGrid) skillsObserver.observe(skillsGrid);

    /* ---------- GITHUB CONTRIBS GRID GENERATOR ---------- */
    const contribGraph = document.getElementById('contrib-graph');
    if (contribGraph) {
      const colors = ['#131314', '#351216', '#641b25', '#a42838', '#ff4d5e'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      // Build 53 columns (weeks)
      for (let w = 0; w < 53; w++) {
        const col = document.createElement('div');
        col.className = 'contrib-col';

        for (let d = 0; d < 7; d++) {
          const cell = document.createElement('div');
          cell.className = 'contrib-cell';

          // Weighted random commits representation
          let rate = Math.random();
          let colorIdx = 0;
          if (rate > 0.85) colorIdx = 4;
          else if (rate > 0.7) colorIdx = 3;
          else if (rate > 0.5) colorIdx = 2;
          else if (rate > 0.3) colorIdx = 1;

          cell.style.backgroundColor = colors[colorIdx];

          // Add commits tooltip
          const tooltip = document.createElement('span');
          tooltip.className = 'contrib-tooltip';
          const contributionsNum = colorIdx === 0 ? 'No' : `${colorIdx * 2 + Math.floor(Math.random() * 2)}`;
          tooltip.textContent = `${contributionsNum} contributions`;
          cell.appendChild(tooltip);

          col.appendChild(cell);
        }
        contribGraph.appendChild(col);
      }
    }

    /* ---------- CONTACT COPY EMAIL ---------- */
    const copyEmailBtn = document.querySelector('.copy-email-btn');
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        const emailAddress = 'blingeshwaran2006@gmail.com';
        navigator.clipboard.writeText(emailAddress).then(() => {
          copyEmailBtn.classList.add('copied');
          const btnText = copyEmailBtn.querySelector('.copy-text');
          const btnIcon = copyEmailBtn.querySelector('i');
          
          if (btnText) btnText.textContent = 'Email Copied!';
          if (btnIcon) btnIcon.setAttribute('data-lucide', 'check');
          lucide.createIcons();
          
          playAudioFeedback(1000, 0.12, 0.02);

          setTimeout(() => {
            copyEmailBtn.classList.remove('copied');
            if (btnText) btnText.textContent = 'Copy Email';
            if (btnIcon) btnIcon.setAttribute('data-lucide', 'copy');
            lucide.createIcons();
          }, 2200);
        });
      });
    }

    /* ---------- BACK TO TOP ---------- */
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

// Keyboard Accessibility navigation trigger
document.querySelectorAll('.tilt-card, .cert-item, .achieve-card, .pinned-repo').forEach(card => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Find a link inside the card and click it
      const link = card.querySelector('a');
      if (link) {
        link.click();
      } else {
        card.click();
      }
    }
  });
});
