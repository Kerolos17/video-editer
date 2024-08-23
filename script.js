document.addEventListener("DOMContentLoaded", function() {
    const portfolioContainer = document.getElementById('portfolio-videos');
    const tabButtons = document.querySelectorAll('.tab-button');

    function loadVideos(category) {
        fetch('videos.json')
            .then(response => response.json())
            .then(data => {
                portfolioContainer.innerHTML = '';
                
                const videos = data[category] || [];
                
                videos.forEach(video => {
                    const videoItem = document.createElement('div');
                    videoItem.classList.add('video-item', 'relative', 'thumbnail');
                    videoItem.innerHTML = `
                        <img src="${video.thumbnail}" alt="${video.title}" class="thumbnail-img">
                        <button class="play-button">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                        </button>
                        <video class="hidden lazyload" data-src="${video.src}" controls>
                            <source data-src="${video.src}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `;

                    const imgElement = videoItem.querySelector('img');
                    const playButton = videoItem.querySelector('.play-button');
                    const videoElement = videoItem.querySelector('video');

                    function generateThumbnail(videoElement, callback) {
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.width = 320;
                        canvas.height = 180;
                        videoElement.currentTime = 1;
                        videoElement.addEventListener('seeked', function() {
                            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                            const dataURL = canvas.toDataURL('image/jpeg');
                            callback(dataURL);
                        }, { once: true });
                    }

                    videoElement.addEventListener('loadedmetadata', function() {
                        generateThumbnail(videoElement, function(dataURL) {
                            imgElement.src = dataURL;
                        });
                    });

                    videoItem.addEventListener('click', function(event) {
                        if (event.target.classList.contains('play-button')) {
                            videoElement.classList.remove('hidden');
                            videoElement.play().catch(error => console.error('Error playing video:', error));
                            imgElement.classList.add('hidden');
                            playButton.classList.add('hidden');
                        }
                    });

                    portfolioContainer.appendChild(videoItem);
                });
                
                let lazyVideos = [].slice.call(document.querySelectorAll("video.lazyload"));

                if ("IntersectionObserver" in window) {
                    let lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
                        entries.forEach(function(entry) {
                            if (entry.isIntersecting) {
                                let lazyVideo = entry.target;
                                let sources = lazyVideo.querySelectorAll("source");
                                sources.forEach(source => {
                                    source.src = source.dataset.src;
                                });
                                lazyVideo.load();
                                lazyVideo.classList.remove("lazyload");
                                lazyVideoObserver.unobserve(lazyVideo);
                            }
                        });
                    });

                    lazyVideos.forEach(function(lazyVideo) {
                        lazyVideoObserver.observe(lazyVideo);
                    });
                } else {
                    lazyVideos.forEach(function(lazyVideo) {
                        let sources = lazyVideo.querySelectorAll("source");
                        sources.forEach(source => {
                            source.src = source.dataset.src;
                        });
                        lazyVideo.load();
                        lazyVideo.classList.remove("lazyload");
                    });
                }
            })
            .catch(error => console.error('Error loading video data:', error));
    }

    loadVideos('Commercial');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            loadVideos(category);
            
            tabButtons.forEach(btn => btn.classList.remove('bg-blue-700'));
            this.classList.add('bg-blue-700');
        });
    });
});
