import { Component, OnInit, AfterViewInit } from '@angular/core';
import 'gsap';
import { Power0 } from 'gsap/all';
// import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin.min';
// import * as MorphSVGPlugin from 'gsap/MorphSVGPlugin.min';
import { Router } from '@angular/router';

declare var TweenMax: any;
declare var TimelineMax: any;

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})

export class NotFoundComponent implements OnInit, AfterViewInit {
  window: Window = window;
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  cursorPos = { xOffset: 0, yOffset: 0 };
  clicked: boolean;
  cancelled: boolean;
  eyes: any;
  eyesObj: any;
  eyesObjInit: any;
  document: Document = document;
  elementList = [];
  svgObject: any;
  confetitiesObj: any;
  blobs: any;
  myEyes: any;
  clientRect: any = { top: 0, left: 0 };
  eyeOffset: any = { x: 0, y: 0 };
  bBox: any;
  centerX: any;
  centerY: any;
  percentTop: any;
  percentLeft: any;
  tween: any;
  buttonClick = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    window.addEventListener('resize', this.setWindowSize);
  }

  ngAfterViewInit() {
    this.setWindowSize();
    this.eyes = document.getElementById('eyes');
    this.svgObject = Array.from(this.eyes.childNodes);
    this.clicked = true;
    this.buttonClick = false;

    if (document.getElementById('eyes')) {
      window.addEventListener('mousemove', this.onmousemove);
      window.addEventListener('touchmove', this.ontouchmove);
    }

    this.confetitiesObj = document.getElementById('confetti').childNodes;

    // this.animateBlob();
    this.animate();
  }


  setWindowSize() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }

  // handleClick() {
  //   return this.buttonClick = true;
  // }

  onmousemove(e: MouseEvent) {
    if (document.getElementById('eyes')) {
      this.eyes = document.getElementById('eyes').parentNode;
      this.svgObject = this.eyes.childNodes;
      this.myEyes = this.svgObject[0];
      this.eyesObj = Array.from(this.myEyes.childNodes);
      // this.buttonClick = false;

      this.cursorPos = {
        xOffset: e.clientX,
        yOffset: e.clientY
      };

      this.clientRect = {
        top: 0,
        left: 0
      };

      this.centerX = {};
      this.centerY = {};
      this.percentTop = {};
      this.percentLeft = {};

      document.querySelector('#go-back').addEventListener('click', () => {
        this.buttonClick = true;
        setTimeout(() => {
          this.buttonClick = false;
        }, 7000);
      });

      if (!this.clicked && !this.buttonClick) {
        for (let i = 0; i < this.eyesObj.length; i++) {
          // getOffset
          this.eyesObj[i].getBoundingClientRect();
          this.clientRect[i] = {
            top: this.eyesObj[i].getBoundingClientRect().top,
            left: this.eyesObj[i].getBoundingClientRect().left
          };

          // // moveEye
          this.centerX[i] = this.clientRect[i].top + this.eyesObj[i].getBBox().width / 2;
          this.centerY[i] = this.clientRect[i].left + this.eyesObj[i].getBBox().height / 2;
          this.percentTop[i] = Math.round((this.cursorPos.yOffset - this.centerY[i]) * 100 / window.innerHeight);
          this.percentLeft[i] = Math.round((this.cursorPos.xOffset - this.centerX[i]) * 100 / window.innerWidth);
          this.eyesObj[i].style.transform = `translate(${this.percentLeft[i] / 5}px, ${this.percentTop[i] / 5}px)`;
        }
      } else {
        for (let i = 0; i < this.eyesObj.length; i++) {
          this.eyesObj[i].style.transform = `translate(${0}px, ${0}px)`;
        }
      }

      return this.cursorPos;
    }
  }

  ontouchmove(e: TouchEvent) {
    if (document.getElementById('eyes')) {
      this.cursorPos = {
        xOffset: e.targetTouches[0].pageX,
        yOffset: e.targetTouches[0].pageY
      };

      this.eyes = document.getElementById('eyes').parentNode;
      this.svgObject = this.eyes.childNodes;
      this.myEyes = this.svgObject[0];
      this.eyesObj = Array.from(this.myEyes.childNodes);

      this.clientRect = {
        top: 0,
        left: 0
      };

      this.centerX = {};
      this.centerY = {};
      this.percentTop = {};
      this.percentLeft = {};
      this.buttonClick = false;

      document.querySelector('#go-back').addEventListener('click', () => {
        this.buttonClick = true;
        setTimeout(() => {
          this.buttonClick = false;
        }, 7000);
      });

      if (!this.clicked && !this.buttonClick) {
        for (let i = 0; i < this.eyesObj.length; i++) {
          // getOffset
          this.eyesObj[i].getBoundingClientRect();
          this.clientRect[i] = {
            top: this.eyesObj[i].getBoundingClientRect().top,
            left: this.eyesObj[i].getBoundingClientRect().left
          };

          // // moveEye
          this.centerX[i] = this.clientRect[i].top + this.eyesObj[i].getBBox().width / 2;
          this.centerY[i] = this.clientRect[i].left + this.eyesObj[i].getBBox().height / 2;
          this.percentTop[i] = Math.round((this.cursorPos.yOffset - this.centerY[i]) * 100 / window.innerHeight);
          this.percentLeft[i] = Math.round((this.cursorPos.xOffset - this.centerX[i]) * 100 / window.innerWidth);
          this.eyesObj[i].style.transform = `translate(${this.percentLeft[i] / 5}px, ${this.percentTop[i] / 5}px)`;
        }
      } else {
        for (let i = 0; i < this.eyesObj.length; i++) {
          this.eyesObj[i].style.transform = `translate(${0}px, ${0}px)`;
        }
      }

      return this.cursorPos;
    }
  }

  // animateBlob() {
  //   const blob1 = document.getElementById('blob-1');
  //   const blob3 = document.getElementById('blob-3');

  //   console.log(MorphSVGPlugin.version);

  //   this.clicked = true;
  //   const speed = 10;
  //   const tlBlob = new TimelineMax({ repeat: -1 });
  //   tlBlob.to(blob1, speed, {morphSVG: blob3, ease: Power0.easeNone})
  //         .to(blob1, speed, {morphSVG: blob1, ease: Power0.easeNone});
  // }

  animate() {
    this.clicked = true;
    let clikedAnim = this.clicked;
    let buttonClick = false;

    const select = function (el) {
      return document.getElementById(el);
    };

    const envelope = select('envelope'),
      eyeGroup = select('eye-group'),
      paper = select('paper-group'),
      mouth = select('mouth'),
      mouthHappy = select('mouth-happy'),
      // eyeLeft = MorphSVGPlugin.convertToPath(select('eye-left')),
      // eyeRight = MorphSVGPlugin.convertToPath(select('eye-right')),
      eyes = select('eyes'),
      eyesLaughing = select('eyes-laughing'),
      eyeLeft = select('eye-left'),
      eyeRight = select('eye-right'),
      eyeLaughingLeft = select('eye-laughing-left'),
      eyeLaughingRight = select('eye-laughing-right'),
      eyebrowHappy = select('eyebrow-happy'),
      eyebrowHappyLeft = select('eyebrow-happy-left'),
      eyebrowHappyRight = select('eyebrow-happy-right'),
      eyebrowSadLeft = select('eyebrow-sad-left'),
      eyebrowSadRight = select('eyebrow-sad-right'),
      mouthWorry = select('mouth-worry'),
      openMouth = select('open-mouth'),
      tongue = select('tongue'),
      cancelButton = select('go-back');

    const initialMouth = mouthWorry.getAttribute('d');
    const initialEyebrowSadLeft = eyebrowSadLeft.getAttribute('d');
    const initialEyebrowSadRight = eyebrowSadRight.getAttribute('d');
    const initialEyeLeft = eyeLeft.getAttribute('d');
    const initialEyeRight = eyeRight.getAttribute('d');

    this.confetitiesObj = document.getElementById('confetti').childNodes;
    const myConfeti = Array.from(this.confetitiesObj);

    const title = document.querySelector('.title'),
      subtitle = document.querySelector('.subtitle');

    const masterTl = new TimelineMax();

    cancelButton.addEventListener('mouseover', willCancel);
    cancelButton.addEventListener('touchstart', willCancel);
    cancelButton.addEventListener('click', () => {
      hasCancelled();
      buttonClick = true;
      setTimeout(() => {
        goBack();
        this.router.navigate(['/']);
        buttonClick = false;
      }, 7000);
    }
    );
    cancelButton.addEventListener('mouseout', initFace);
    cancelButton.addEventListener('touchleave', initFace);

    function random(min, max) {
      if (max == null) {
        max = min;
        min = 0;
      }
      return Math.random() * (max - min) + min;
    }

    function makeConfetti() {
      const speed = 3;
      const confettiTl = new TimelineMax({ paused: true });
      myConfeti.forEach(function (el) {
        const angle = random(0, 360);
        const delay = random(0, 6);
        const opacity = random(0.5, 1);
        const tl = new TimelineMax({ delay: delay });
        const posX = Math.cos(angle * Math.PI / 180) * 250;
        const posY = Math.sin(angle * Math.PI / 180) * 250;
        TweenMax.set(el, { autoAlpha: 1 });
        tl.to(el, speed, { x: posX, y: posY, ease: Power0.easeOut, rotation: 360, repeat: -1 });
        confettiTl.add(tl, 0);
      });
      return confettiTl;
    }

    // Envelope animations
    function happyJump() {
      const speed = 0.15;
      const happyJumpTl = new TimelineMax({ repeat: -1, repeatDelay: 1, delay: 0.2, paused: true });
      happyJumpTl.to(envelope, speed, { y: -20, ease: Power0.easeNone })
        .to(envelope, speed, { y: 0, ease: Power0.easeNone })
        .to(envelope, speed, { y: -10, ease: Power0.easeNone })
        .to(envelope, speed, { y: 0, ease: Power0.easeNone })
        .to(envelope, speed, { y: -5, ease: Power0.easeNone })
        .to(envelope, speed, { y: 0, ease: Power0.easeNone });
      return happyJumpTl;
    }

    const doJump = happyJump();
    const addConfetti = makeConfetti();

    function willCancel() {
      clikedAnim = false;
      const speed = 0.2;

      mouthWorry.setAttribute('d', mouthHappy.getAttribute('d'));
      eyebrowSadLeft.setAttribute('d', eyebrowHappyLeft.getAttribute('d'));
      eyebrowSadRight.setAttribute('d', eyebrowHappyRight.getAttribute('d'));

      TweenMax.to(mouth, speed, { y: 10 });
      TweenMax.to(eyebrowSadLeft, speed, { y: -10 });
      TweenMax.to(eyebrowSadRight, speed, { y: -10 });

      return clikedAnim;
    }

    function hasCancelled() {
      clikedAnim = true;
      buttonClick = true;
      masterTl.add(doJump.play());
      masterTl.add(addConfetti.play());

      const speed = 0.1;

      TweenMax.to(eyeLeft, speed, { css: { display: 'none' }, ease: Power0.easeNone });
      TweenMax.to(eyeRight, speed, { css: { display: 'none' }, ease: Power0.easeNone });
      TweenMax.to(mouthWorry, speed, { css: { display: 'none' }, ease: Power0.easeNone });
      TweenMax.to(eyebrowSadLeft, { css: { display: 'none' }, ease: Power0.easeNone });
      TweenMax.to(eyebrowSadRight, { css: { display: 'none' }, ease: Power0.easeNone });

      TweenMax.to(openMouth, speed, { css: { display: 'block' }, ease: Power0.easeNone });
      TweenMax.to(tongue, speed, { css: { display: 'block' }, ease: Power0.easeNone });
      TweenMax.to(eyesLaughing, speed, { css: { display: 'block' }, ease: Power0.easeNone });
      TweenMax.to(eyesLaughing, speed, { stroke: '#009688', fill: 'none', ease: Power0.easeNone });
      TweenMax.to(eyebrowHappyLeft, { css: { display: 'block' }, ease: Power0.easeNone });
      TweenMax.to(eyebrowHappyRight, { css: { display: 'block' }, ease: Power0.easeNone });
      TweenMax.to(eyebrowHappyLeft, speed, { y: 0 });
      TweenMax.to(eyebrowHappyRight, speed, { y: 0 });

      title.innerHTML = 'Thanks for staying with us!';
      subtitle.innerHTML = 'You will return to the main page in a few seconds. Yay!';
    }

    function initFace() {
      if (!clikedAnim && !buttonClick) {
        const speed = 0.1;
        mouthWorry.setAttribute('d', initialMouth);
        eyebrowSadLeft.setAttribute('d', initialEyebrowSadLeft);
        eyebrowSadRight.setAttribute('d', initialEyebrowSadRight);

        TweenMax.to(mouthWorry, speed, { fill: 'none', stroke: '#009688', ease: Power0.easeNone });
        TweenMax.to(tongue, speed, { css: { display: 'none' }, ease: Power0.easeNone });
        TweenMax.to(paper, speed, { y: 0 });
        TweenMax.to(eyeGroup, speed, { y: 0 });
        TweenMax.to(mouth, speed, { y: 0 });
        TweenMax.to(eyebrowSadLeft, speed, { y: 0 });
        TweenMax.to(eyebrowSadRight, speed, { y: 0 });
        TweenMax.to(eyeLeft, speed, { stroke: 'none', fill: '#009688', ease: Power0.easeNone });
        TweenMax.to(eyeRight, speed, { stroke: 'none', fill: '#009688', ease: Power0.easeNone });
      }
    }

    function goBack() {
      clikedAnim = false;
      buttonClick = false;
      initAnimations();
      masterTl.remove(doJump);
      masterTl.remove(makeConfetti);
      myConfeti.forEach(function (el) {
        TweenMax.set(el, { x: 0, y: 0, rotation: 0 });
      });
    }

    function initAnimations() {
      clikedAnim = false;
      initFace();
      // animateBlob();

      return clikedAnim;
    }

    return {
      init: (): any => {
        initAnimations();
      }
    };
  }

}

