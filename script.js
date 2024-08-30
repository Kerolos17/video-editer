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
                        <div class="video-container ">
                            <iframe width="560" height="315" 
                                src="https://www.youtube.com/embed/${video.youtubeId}?autoplay=1" 
                                frameborder="0" 
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                    `;
                    portfolioContainer.appendChild(videoItem);
                });
            })
            .catch(error => console.error('Error loading video data:', error));
    }

    loadVideos('Commercial');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            loadVideos(category);
            // Remove the active class from all tab buttons
            tabButtons.forEach(btn => btn.classList.remove('bg-blue-700'));
            // Add the active class to the clicked tab button
            this.classList.add('bg-blue-700');

        });
    });
});
