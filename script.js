
function redirect()
{
    window.location.replace("C:\\Users\\JITHIN V J\\OneDrive\\Desktop\\WUID\\Web Project\\loginpage.html");
}
function redirect2()
{
    window.location.replace("C:\\Users\\JITHIN V J\\OneDrive\\Desktop\\WUID\\Web Project\\GameStore.html");
}
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const slideshow = document.querySelector('.d2');
function showSlides() {
                
                slideIndex++;
                if (slideIndex >= slides.length) {
                  slideIndex = 0;
                }
                const offset = -slideIndex * 100;
                d2.style.transform = `translateX(${offset}%)`;
                }
            
              // Call showSlides function every 3 seconds
              setInterval(showSlides, 1000);
