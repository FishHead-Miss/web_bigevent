// 注意:每次调用$.get()或$.post或$.ajax()的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中,可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 发起Ajax请求之前统一拼接根路径
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    // 全局统一挂载 complete 回调函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem("token");
            location.href = "/login.html";
        }
    }
});