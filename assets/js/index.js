$(function() {
        getUserInfo();
        var layer = layui.layer;
        // 点击按钮实现退出功能
        $("#btnLogout").on("click", function() {
            layer.confirm('确定要退出登录?', { icon: 3, title: '提示' }, function(index) {
                //清除本地存储中的token
                localStorage.removeItem("token");
                // 跳转到登录页
                location.href = "./login.html";
                // 关闭confirm框
                layer.close(index);
            });

        });
    })
    // 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // 从本地获取请求头的权限
        // headers: { Authorization: localStorage.getItem("token") || "" },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败!");
            }
            renderAvatar(res.data);
        }
    })
}

//渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp" + name);

    // 按需渲染用户头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();

    } else {
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}