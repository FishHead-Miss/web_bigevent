$(function() {
    // 点击去注册连接
    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    });

    //点击去登录连接
    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    });

    // 监听注册表单的提交事件
    $("#form_reg").on("submit", function(e) {
        // 1.阻止默认行为
        e.preventDefault();
        // 2.发起Ajax的POST请求
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        };
        $.post("/api/reguser", data, function(res) {
            if (res.status !== 0) {
                return console.log(res.message);
            }
            alert("注册成功!请登录!");
            // 模拟人的点击行为
            $("#link_login").click();
        });
    });

    // 监听登录表单的提交事件
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return alert("登陆失败!")
                }
                alert("登录成功~");
                // 将成功得到的token字符串,保存到localStorage中
                localStorage.setItem("token", res.token);
                // 跳转到后台首页
                location.href = "index.html";
            }

        });
    });

});