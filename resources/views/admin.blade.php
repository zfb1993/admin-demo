<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <title>Laravel Vue Element-Ui</title>
</head>
<body>
<div id="app">
    <Home></Home>
</div>
<script src="{{ mix('js/app.js') }}"></script>
<style>
    *{
        padding: 0px;
        margin: 0px;
    }
    #app{
        height: calc(100vh);
    }
</style>
</body>
</html>
