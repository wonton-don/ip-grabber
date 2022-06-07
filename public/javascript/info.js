const h2 = document.querySelector('.redirect');
let div;

h2.addEventListener('click', () => {
    if (!div) {
        const textBox = document.createElement('Input');
        textBox.placeholder = 'YouTube.com'
        const label = document.createElement('p');
        label.innerText = 'New Link';
        label.classList.add('label');
        const submitBtn = document.createElement('button');
        submitBtn.innerText = 'Submit';
        const body = document.querySelector('body');
        div = document.createElement('div');
        div.classList.add('edit');
        div.appendChild(label);
        div.appendChild(textBox);
        div.appendChild(submitBtn);
        body.appendChild(div)
        submitBtn.addEventListener('click', async () => {
            await axios.post(`http://localhost:8080/edit/${window.location.href.split('/')[4]}`, {
                redirect: textBox.value
            })
                .then((res) => {
                    const { data } = res;
                    h2.innerHTML = `Goes to: <span>${data}</span>`;
                    submitBtn.remove();
                    div.remove();
                    div = undefined;
                })
        })
    }
})

const ips = document.querySelectorAll('.ip');

for (let ip of ips) {
    const ipAddress = ip.innerText;
    const nextEl = ip.nextElementSibling;
    const finalEl = nextEl.nextElementSibling;
    let data;
    axios.get(`http://ipwho.is/${ipAddress}`)
        .then(async (res) => {
            data = await res.data;
            nextEl.innerText = `${data.city}, ${data.region}`;
            finalEl.innerText = data.connection.isp;
        })
}