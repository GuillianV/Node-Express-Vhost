import Highway from '@dogstudio/highway'
import gsap, { Expo } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(MotionPathPlugin, ScrollToPlugin, ScrollTrigger)
import * as Swiper from 'swiper'
import { Autoplay } from 'swiper';

Swiper.Swiper.use([Autoplay]);

import LoadHeader from '../userControls/header'
import LoadFooter from '../userControls/footer'
import { MobileOverflow, MatchMedia, detectMob } from '../../detectmobile'



class Home extends Highway.Renderer {


    onEnter() {
        //Javascript a lancer lorsque la page se charge
        
    }

    onEnterCompleted() {
        //Javascript a lancer lorsque la page est chargé
        
        let windowsWidth = MatchMedia();
        let IsMobile = detectMob();

        MobileOverflow()
        LoadHeader()
        LoadFooter()

  

    }

    onLeave() {
        //Javascript a lancer lorsque la page part/unload
    }

    onLeaveCompleted() {
        //Javascript a lancer lorsque la page est partie
    }
}

export default Home;