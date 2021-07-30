import Highway from '@dogstudio/highway'
import gsap, { Expo } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
// import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(MotionPathPlugin, ScrollToPlugin, ScrollTrigger)
//Load user controls
import LoadHeader from '../userControls/header'
import LoadFooter from '../userControls/footer'
import { MobileOverflow, MatchMedia, detectMob } from '../../detectmobile'
import { LoadAbout } from '../../images'
class About extends Highway.Renderer {


    onEnter() {
        //Javascript a lancer lorsque la page se charge
      

    }

    onEnterCompleted() {
        //Javascript a lancer lorsque la page est chargé
        let windowsWidth = MatchMedia();
        let IsMobile = detectMob();

        LoadHeader()
        LoadAbout()
        LoadFooter()

        MobileOverflow(false)
        
       
        const tl = gsap.timeline();
        tl.to(".layer1", 5, { y: -500 })
            .to(".layer2", 5, { y: -500 }, '-=5')
            .to(".layer3", 5, { y: -200 }, '-=5')
            .to(".layer4", 5, { y: 200 }, '-=5')
            .to(".layer5", 5, { y: 500 }, '-=5')
            .to(".layer6", 5, { y: -500 }, '-=5')
            .to(".parallax-bottom", 5, { y: -500 }, '-=5')

        ScrollTrigger.create({
            animation: tl,
            trigger: ".parallax-section",
            markers: false,
            start: "top 50%",
            end: "+=2000",
            scrub: true,
            
        })


        if(!IsMobile){
            gsap.set(".pathBall", { xPercent: -50, yPercent: -50, x: 0 });

            var action = gsap.timeline({
                defaults: { duration: 1 },
                scrollTrigger: {
                    trigger: ".start-svg",
                    endTrigger: ".end-svg",
                    markers: false,
                    scrub: true,
                    start: "top center",
                    end: "bottom center",
            
                }
            })
                .fromTo(".pathLine", { drawSVG: "100% 100%" }, { drawSVG: "0% 100%" }, 0)
                .from(".pathBall", { motionPath: { path: ".pathLine", opacity:1, align: ".pathLine", autoRotate: -10,  alignOrigin: [0.5, 0.5] } }, 0)
               
        }


  
       
    }

    onLeave() { 
        //Javascript a lancer lorsque la page part/unload
    }

    onLeaveCompleted() {
        //Javascript a lancer lorsque la page est partie
    }
}

export default About;