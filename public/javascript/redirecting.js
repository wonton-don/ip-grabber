let ip = 'test';

let apiKey = 'aa3984661d555365c55727fbe2d0acf805ab2bb8680ecb728a4da319';


axios.get(`https://api.ipdata.co?api-key=${apiKey}`)
    .then(async res => {
        const data = await res.data;
        ip = data.ip;
        window.location.href = `${window.location.origin}/${window.location.href.split('/')[4]}/${ip}`
    })