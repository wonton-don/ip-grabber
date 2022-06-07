if (document.cookie.includes('userLinks')) {
    const recentTrackers = document.querySelectorAll('.recentTracker');
    const userLinks = document.cookie.match(new RegExp('(^| )' + 'userLinks' + '=([^;]+)'))[2].trim().split('$#%');
    recentTrackers[0].firstChild.nextSibling.firstChild.nextSibling.nextElementSibling.innerText = userLinks[0].split('^*%')[1];
    recentTrackers[0].firstChild.nextSibling.nextElementSibling.innerText = userLinks[0].split('^*%')[0];
    if (recentTrackers.length >= 2) {
        recentTrackers[1].firstChild.nextSibling.firstChild.nextSibling.nextElementSibling.innerText = userLinks[1].split('^*%')[1];
        recentTrackers[1].firstChild.nextSibling.nextElementSibling.innerText = userLinks[1].split('^*%')[0];
        recentTrackers[1].classList.remove('gone');
    }
    document.querySelector('.recentTrackerHeader').classList.remove('gone');
    recentTrackers[0].classList.remove('gone');
}

const submitButton = document.querySelector('.submitButton');
const redirectInput = document.querySelector('#redirect');

const input = document.querySelector('input');
const search = document.querySelector('.search')
input.addEventListener('focus', (e) => {
    search.style.maxWidth = '52%';
})

input.addEventListener('blur', (e) => {
    search.style.maxWidth = '35%';
})

input.addEventListener('keyup', async (e) => {
    if (e.key === 'Enter') {
        await axios.post('/createLink', {
            redirect: redirectInput.value
        })
            .then(async res => {
                const recentTrackers = document.querySelectorAll('.recentTracker');
                if (recentTrackers.length >= 2) {
                    recentTrackers[1].classList.add('gone');
                }
                document.querySelector('.recentTrackerHeader').classList.add('gone');
                recentTrackers[0].classList.add('gone');
                const data = await res.data.split(' ^^^^^ ');
                const link1 = document.querySelector('.link1');
                link1.innerText = data[0];
                const link2 = document.querySelector('.link2');
                link2.innerText = data[1];
                document.querySelector('.copyLink1').classList.remove('none');
                document.querySelector('.copyLink2').classList.remove('none');
                input.blur();
                if (document.cookie.includes('userLinks')) {
                    document.cookie = `userLinks=${document.cookie.match(new RegExp('(^| )' + 'userLinks' + '=([^;]+)'))[2].trim()}$#%${data[0]}^*%${new Date().toLocaleDateString()}`;
                } else {
                    document.cookie = `userLinks=${data[0]}^*%${new Date().toLocaleDateString()}`
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
})


function copyToClickBoard(content) {
    navigator.clipboard.writeText(content);
}