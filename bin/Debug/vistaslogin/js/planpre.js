function verificarseguridad()
{
    if ($("#security").val() == "0"){
        window.location.replace("../template/page-signin.html");
    }
}