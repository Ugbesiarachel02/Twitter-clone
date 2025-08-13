
const sampleTweets = [
    {
        name: "Tech News Daily",
        handle: "@technews",
        time: "2h",
        text: "🚀 Breaking: New JavaScript framework 'SpeedJS' promises 10x faster performance than React! Early benchmarks look promising. What are your thoughts?",
        likes: 1234,
        retweets: 567,
        replies: 89
    },
    {
        name: "Web Dev Tips",
        handle: "@webdevtips",
        time: "4h",
        text: "💡 CSS Tip: Use 'clamp()' for responsive font sizes! Example: font-size: clamp(1rem, 2.5vw, 2rem); This creates smooth scaling text that adapts to screen size.",
        likes: 892,
        retweets: 234,
        replies: 45
    },
    {
        name: "Sarah Developer",
        handle: "@sarahdev",
        time: "6h",
        text: "Just shipped my first open-source project! 🎉 A lightweight CSS grid system that's only 2KB. Check it out and let me know what you think! #OpenSource #WebDev",
        likes: 567,
        retweets: 123,
        replies: 78
    },
    {
        name: "Code Academy",
        handle: "@codeacademy",
        time: "8h",
        text: "New tutorial alert! 🔔 Learn how to build a Twitter clone from scratch using vanilla JavaScript. No frameworks needed! Perfect for beginners. Link in bio!",
        likes: 2341,
        retweets: 890,
        replies: 234
    }
];


const tweetInput = document.getElementById('tweet-input');
const tweetSubmit = document.getElementById('tweet-submit');
const tweetFeed = document.getElementById('tweet-feed');


function initApp() {
    renderTweets();
    setupEventListeners();
}


function renderTweets() {
    tweetFeed.innerHTML = '';
    
    sampleTweets.forEach(tweet => {
        const tweetElement = createTweetElement(tweet);
        tweetFeed.appendChild(tweetElement);
    });
}


function createTweetElement(tweet) {
    const tweetDiv = document.createElement('div');
    tweetDiv.className = 'tweet';
    

    const tweetIndex = sampleTweets.indexOf(tweet);
    tweetDiv.setAttribute('data-index', tweetIndex);
    
    tweetDiv.innerHTML = `
        <img src="https://via.placeholder.com/48" alt="Profile" class="profile-img">
        <div class="tweet-content">
            <div class="tweet-header">
                <span class="tweet-name">${tweet.name}</span>
                <span class="tweet-handle">@${tweet.handle}</span>
                <span class="tweet-time">· ${tweet.time}</span>
                ${tweet.handle === '@you' ? '<button class="delete-tweet" title="Delete Tweet">&times;</button>' : ''}
            </div>
            <div class="tweet-text">${tweet.text}</div>
            <div class="tweet-actions">
                <div class="tweet-action">
                    <i class="far fa-comment"></i>
                    <span>${tweet.replies}</span>
                </div>
                <div class="tweet-action retweet">
                    <i class="fas fa-retweet"></i>
                    <span>${tweet.retweets}</span>
                </div>
                <div class="tweet-action like">
                    <i class="far fa-heart"></i>
                    <span>${tweet.likes}</span>
                </div>
                <div class="tweet-action">
                    <i class="fas fa-share-alt"></i>
                </div>
            </div>
        </div>
    `;
    
    return tweetDiv;
}


function setupEventListeners() {
   
    tweetInput.addEventListener('input', handleTweetInput);
    
 
    tweetSubmit.addEventListener('click', handleTweetSubmit);
    
    
    document.addEventListener('click', function(e) {
        handleLikeClick(e);
        handleDeleteClick(e);
    });
}


function handleDeleteClick(e) {
    if (e.target.classList.contains('delete-tweet')) {
        const tweetDiv = e.target.closest('.tweet');
        const index = parseInt(tweetDiv.getAttribute('data-index'));
        if (!isNaN(index)) {
          
            sampleTweets.splice(index, 1);
           
            renderTweets();
        }
    }
}


function handleTweetInput() {
    const charCount = tweetInput.value.length;
    const maxChars = 280;
    
    if (charCount > maxChars) {
        tweetInput.value = tweetInput.value.substring(0, maxChars);
    }
    
    tweetSubmit.disabled = tweetInput.value.trim() === '';
}


function handleTweetSubmit() {
    const tweetText = tweetInput.value.trim();
    
    if (tweetText === '') return;
    
    const newTweet = {
        name: "You",
        handle: "@you",
        time: "now",
        text: tweetText,
        likes: 0,
        retweets: 0,
        replies: 0
    };
    
    
    sampleTweets.unshift(newTweet);
    
   
    renderTweets();
    
   
    tweetInput.value = '';
    tweetSubmit.disabled = true;
}

function handleLikeClick(e) {
    if (e.target.classList.contains('fa-heart')) {
        const likeIcon = e.target;
        const likeCount = likeIcon.nextElementSibling;
        
        if (likeIcon.classList.contains('far')) {
            // Like
            likeIcon.classList.remove('far');
            likeIcon.classList.add('fas');
            likeIcon.style.color = '#f91880';
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
        } else {
            // Unlike
            likeIcon.classList.remove('fas');
            likeIcon.classList.add('far');
            likeIcon.style.color = '';
            likeCount.textContent = parseInt(likeCount.textContent) - 1;
        }
    }
}


document.addEventListener('DOMContentLoaded', initApp);
