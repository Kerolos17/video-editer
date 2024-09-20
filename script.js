document.addEventListener("DOMContentLoaded", function () {
    const portfolioContainer = document.getElementById("portfolio-videos");
    const tabButtons = document.querySelectorAll(".tab-button");
    function loadVideos(category) {
      fetch("videos.json")
        .then((response) => response.json())
        .then((data) => {
          portfolioContainer.innerHTML = "";
          const videos = data[category] || [];
          videos.forEach((video) => {
            const videoItem = document.createElement("div");
            videoItem.classList.add("video-item", "relative", "thumbnail");
            videoItem.innerHTML = `
                                              <div class="video-container ">
                              <iframe width="360" height="315" 
                                  src="https://www.youtube.com/embed/${video.youtubeId}?autoplay=0" 
                                  frameborder="0" 
                                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                  allowfullscreen>
                              </iframe>
                          </div>
                      `;
            portfolioContainer.appendChild(videoItem);
          });
        })
        .catch((error) => console.error("Error loading video data:", error));
    }
    loadVideos("Commercial");
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.getAttribute("data-category");
        loadVideos(category);
        // Remove the active class from all tab buttons
        tabButtons.forEach((btn) => btn.classList.remove("bg-blue-700"));
        // Add the active class to the clicked tab button
        this.classList.add("bg-blue-700");
      });
    });
  });
  // Scroll to top button
  window.onscroll = function () {
    scrollFunction();
  };
  function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      document.getElementById("up").classList.remove("hidden");
    } else {
      document.getElementById("up").classList.add("hidden");
    }
  }
  let up = document.getElementById("up");
  up.addEventListener("click", function () {
    window.scrollTo(0, 0);
    // Smooth scrolling to top
    document.querySelector("#up").scrollIntoView({ behavior: "smooth" });
  });