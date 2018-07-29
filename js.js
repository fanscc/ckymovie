$(function(){
    var Vm = new Vue({
        el: '#Cky',
        data: {
            tatolarr: [],
            moveiList: [],
            page: 0,
            pageSize: 20,
            playshow: false,
            movieSrc: ''
        },
        methods: {
            playmovie(item) {  
               window.location.href = item.url
            }
        },
        created() {
            var _this = this;
            $.ajax({ 
                type: 'get',
                url: "./data.json", 
                success: function(res){
                    _this.tatolarr = JSON.parse(res);
                    console.log( _this.tatolarr)
                    _this.moveiList = _this.tatolarr.slice(_this.page*_this.pageSize,_this.pageSize);
                    console.log( _this.moveiList)
                }
            });
        }
    })
})

