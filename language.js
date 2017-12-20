<script>

if (navigator.appName ==”Netscape”)

var language = navigator.language;

else

var language = navigator.browserLanguage;

if (language.indexOf(“en”) > -1) document.location.href = “en/index.html”;

else if (language.indexOf(“zh”) > -1) document.location.href =”cn/index.html”;

else

document.location.href =”en/index.html”;
</script>