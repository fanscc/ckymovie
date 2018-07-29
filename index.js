const util = require('util');
const axiox = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const config = require('./config.json');
module.exports=function(){
    return new Promise((resolve) => {
        Promise.all(fetchHandler())
        .then(d => { return parseHTML(d)})
        .then(d => saveToFile(d))
        .then(d => {console.log('数据录入完成'); return resolve(d)})
    }) 
}

function fetchHandler(){
    let promiseList = [];
    for (let i = 1; i <= config.pageMaxNum; i++) {
        promiseList.push(axiox({
            method: 'get',
            url: getSourceURL(i),
        }).then(res => {
            return res.data;
        })); 
    }
    return promiseList;
}

function getSourceURL(index) {
    return `http://list.iqiyi.com/www/1/-------------11-${index}-1-iqiyi--.html`
}

function parseHTML(html) {
    const dom = new JSDOM(html);
    let aList = dom.window.document.querySelectorAll('div.site-piclist_pic > a');
    let imgList = dom.window.document.querySelectorAll('div.site-piclist_pic > a > img');
    aList = Array.from(aList);
    imgList = Array.from(imgList);
    return aList.map((a,index) => {
        return {
            source: a.href,
            title: a.title,
            imgUrl: imgList[index].src,
            url: `${config.parseURL}${a.href}`
        }
    });
}

function saveToFile(data) {
    let str = JSON.stringify(data);
    fs.writeFile('./data.json', str, { flag: 'w+' }, (err) => {
        if (err) console.log(err);
    })
}



