new Vue({
    el: '#app',
    data() {
      return {
        bg: 'bio' };
  
    } });

    class ArrowPointer {
      constructor() {
        this.root = document.body;
        this.cursor = document.querySelector(".curzr");
    
        this.position = {
          distanceX: 0,
          distanceY: 0,
          distance: 0,
          pointerX: 0,
          pointerY: 0,
        };
        this.previousPointerX = 0;
        this.previousPointerY = 0;
        this.angle = 0;
        this.previousAngle = 0;
        this.angleDisplace = 0;
        this.degrees = 57.296;
        this.cursorSize = 18.8;
    
        this.init(this.cursor);
      }
    
      init(el) {
        el.removeAttribute("hidden");
        document.body.style.cursor = "none";
        document.body
          .querySelectorAll("button, label, input, textarea, select, a")
          .forEach((el) => {
            el.style.cursor = "inherit";
          });
    
        // Apply cursor styles from the CSS file
        el.classList.add("curzr");
      }
    
      move(event) {
        this.previousPointerX = this.position.pointerX;
        this.previousPointerY = this.position.pointerY;
        this.position.pointerX =
          event.pageX + this.root.getBoundingClientRect().x;
        this.position.pointerY =
          event.pageY + this.root.getBoundingClientRect().y;
        this.position.distanceX =
          this.previousPointerX - this.position.pointerX;
        this.position.distanceY =
          this.previousPointerY - this.position.pointerY;
        this.distance = Math.sqrt(
          this.position.distanceY ** 2 + this.position.distanceX ** 2
        );
    
        this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`;
    
        if (this.distance > 1) {
          this.rotate(this.position);
        } else {
          this.cursor.style.transform += ` rotate(${this.angleDisplace}deg)`;
        }
      }
    
      rotate(position) {
        let unsortedAngle =
          (Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) *
            this.degrees) ||
          0;
        let modAngle;
        const style = this.cursor.style;
        this.previousAngle = this.angle;
    
        if (position.distanceX <= 0 && position.distanceY >= 0) {
          this.angle = 90 - unsortedAngle + 0;
        } else if (position.distanceX < 0 && position.distanceY < 0) {
          this.angle = unsortedAngle + 90;
        } else if (position.distanceX >= 0 && position.distanceY <= 0) {
          this.angle = 90 - unsortedAngle + 180;
        } else if (position.distanceX > 0 && position.distanceY > 0) {
          this.angle = unsortedAngle + 270;
        }
    
        if (isNaN(this.angle)) {
          this.angle = this.previousAngle;
        } else {
          if (this.angle - this.previousAngle <= -270) {
            this.angleDisplace += 360 + this.angle - this.previousAngle;
          } else if (this.angle - this.previousAngle >= 270) {
            this.angleDisplace += this.angle - this.previousAngle - 360;
          } else {
            this.angleDisplace += this.angle - this.previousAngle;
          }
        }
        style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0) rotate(${this.angleDisplace}deg)`;
    
        modAngle =
          this.angleDisplace >= 0
            ? this.angleDisplace % 360
            : 360 + (this.angleDisplace % 360);
        if (modAngle >= 45 && modAngle < 135) {
          style.left = `${-this.cursorSize}px`;
          style.top = `${-this.cursorSize / 2}px`;
        } else if (modAngle >= 135 && modAngle < 225) {
          style.left = `${-this.cursorSize / 2}px`;
          style.top = `${-this.cursorSize}px`;
        } else if (modAngle >= 225 && modAngle < 315) {
          style.left = "0px";
          style.top = `${-this.cursorSize / 2}px`;
        } else {
          style.left = `${-this.cursorSize / 2}px`;
          style.top = "0px";
        }
      }
    
      remove() {
        this.cursor.remove();
      }
    }
    
    (() => {
      const cursor = new ArrowPointer();
      if (
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        document.body.addEventListener("mousemove", (event) => {
          cursor.move(event);
        });
      } else {
        cursor.remove();
      }
    })();    
    
    document.addEventListener("DOMContentLoaded", function() {
      function getChisinauTime() {
        const now = new Date();
        const chisinauTime = now.toLocaleTimeString("en-US", { timeZone: "Europe/Chisinau", hour12: false, hour: "numeric", minute: "numeric" });
        return chisinauTime;
      }
    
      function updateChisinauTime() {
        const chisinauTime = getChisinauTime();
        const chisinauTimeElem = document.getElementById("chisinau-time");
        if (chisinauTimeElem) {
          chisinauTimeElem.textContent = chisinauTime;
        }
      }
    
      // Update the Chisinau time every second
      setInterval(updateChisinauTime, 1000);
    });
    
    
    