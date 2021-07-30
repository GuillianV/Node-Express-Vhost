import Highway from '@dogstudio/highway'
import  gsap from 'gsap';


// let screenWidth = window.screen.height;
// let screenHeight = window.screen.width;
// let screenHypotenuse = Math.sqrt(Math.pow(screenWidth,2) + Math.pow(screenHeight,2))


class Loader extends Highway.Transition {

    in({ from, to, done }) {
        // Reset Scroll
        window.scrollTo(0, 0);

        from.remove();
        done();
      

    }

    out({ from, done }) {
        
        LoaderIn(done,"#loader")
    }

}

export { Loader }



function LoaderIn(done,loader){
    let loaderIn = gsap.timeline();

    loaderIn.set(loader, {
        xPercent: -100,

    });

    loaderIn.to(loader, {
        xPercent: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete:done
    });


}

export { LoaderIn };

function LoaderOut(loader){


    let loaderOut = gsap.timeline();

    loaderOut.to(loader, {
        xPercent: 100,
        duration: 3, 
        ease: "power4.out",
    });
    loaderOut.set(loader, {
        xPercent: -100,
        delay:2,
    });

   
}

export { LoaderOut };



export default Loader;