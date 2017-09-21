<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
</head>
<body>
	<?php
	define(usrName, "admin");
	define(password,"123456");
	function isVaildUserLog($usr,$psd){
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			# code...
			if (usrName == $usr && password == $psd) {
				# code...
				return true;
			}
		}
		return false;
	}
	if (isVaildUserLog($_POST["userName"],$_POST["pwd"])) {
		# code...
		echo "<script>alert('登陆成功');location.href='project.html';</script>";
	}
	else{
		echo "<script language='javaScript'>alert('账户或密码错误');location.href='log.html'</script>";
	}
	?>
</body>
</html>