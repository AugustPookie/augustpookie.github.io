document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('new-post-form');
    const postsContainer = document.getElementById('posts-container');

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const media = document.getElementById('post-media').files[0];

        if (title && content) {
            const post = document.createElement('div');
            post.classList.add('post');
            
            // Create post content
            post.innerHTML = `
                <h3>${title}</h3>
                <p>${content}</p>
                ${media ? `<div class="media">${media.type.startsWith('image') ? `<img src="${URL.createObjectURL(media)}" alt="Post Media">` : `<video controls src="${URL.createObjectURL(media)}"></video>`}</div>` : ''}
                <div class="controls">
                    <button class="upvote">Upvote</button>
                    <button class="downvote">Downvote</button>
                    <button class="show-comments">Show Comments</button>
                </div>
                <div class="comment-section" style="display: none;">
                    <textarea placeholder="Add a comment..."></textarea>
                    <button>Add Comment</button>
                </div>
                <div class="comments-container"></div>
            `;

            // Handle upvote and downvote
            post.querySelector('.upvote').addEventListener('click', () => {
                alert('Upvoted!');
            });

            post.querySelector('.downvote').addEventListener('click', () => {
                alert('Downvoted!');
            });

            // Handle comment section
            const showCommentsButton = post.querySelector('.show-comments');
            const commentSection = post.querySelector('.comment-section');
            const addCommentButton = post.querySelector('.comment-section button');

            showCommentsButton.addEventListener('click', () => {
                commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
            });

            addCommentButton.addEventListener('click', () => {
                const commentContent = commentSection.querySelector('textarea').value;
                if (commentContent) {
                    const comment = document.createElement('div');
                    comment.classList.add('comment');
                    comment.textContent = commentContent;
                    post.querySelector('.comments-container').appendChild(comment);
                    commentSection.querySelector('textarea').value = '';
                }
            });

            postsContainer.prepend(post);

            // Clear the form
            document.getElementById('post-title').value = '';
            document.getElementById('post-content').value = '';
            document.getElementById('post-media').value = '';
        }
    });
});
