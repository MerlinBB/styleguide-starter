<!DOCTYPE html>
<html lang="en" class="no-js">
<head>

    <!-- Meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="HandheldFriendly" content="true">

    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    <meta name="format-detection" content="telephone=no"/>

    <meta name="description" content="">

    <title>Styleguide Starter</title>

    <link rel="stylesheet" type="text/css" media="all" href="/styleguide.css"/> <!-- not needed for production -->
    <link rel="stylesheet" type="text/css" media="all" href="/style.css"/> <!-- dependency for production -->

    <link rel="shortcut icon" type="image/png" href="img/favicons/logo-icon-32x32.png">

    <!-- New iOS7 Sizes -->
    <link rel="apple-touch-icon" href="img/favicons/logo-icon-76x76.png" sizes="76x76">
    <link rel="apple-touch-icon" href="img/favicons/logo-icon-120x120.png" sizes="120x120">
    <link rel="apple-touch-icon" href="img/favicons/logo-icon-152x152.png" sizes="152x152">

    <!-- Metro Tiles -->
    <meta name="msapplication-TileColor" content="#d25353">
    <meta name="msapplication-TileImage" content="img/favicons/logo-icon-152x152.png">

</head>
<body>

<nav class="demo-menu" id="menu"></nav>

<section class="demo-patterns" id="patterns">
    <div class="demo-filter-wrapper">
        <input type="text" class="demo-filter" placeholder="Search Components">
        <span class="demo-clear-query">X</span>
    </div>
    <h1 class="demo-page-title">Styleguide Starter</h1>
    <a href="/buildpack.zip" class="demo-download"><i class="icon-install"></i> Download Buildpack</a>

    <?php
        $files = array();
        $patterns_dir = "components";
        $handle = opendir($patterns_dir);

        while (false !== ($file = readdir($handle))):
            if(stristr($file,'.html')):
                $files[] = $file;
            endif;
        endwhile;

        sort($files);

        // markdown parsing
        include_once '_includes/_parsedown.php';
        $Parsedown = new Parsedown();

        foreach ($files as $file):
            $html = htmlspecialchars(file_get_contents($patterns_dir . '/' . $file));
            $md = htmlspecialchars(@file_get_contents($patterns_dir . '/' . str_replace('.html', '.md', $file)));
        ?>

            <article class="demo-pattern">
                <h1 class="demo-pattern-title">
                    <?php echo str_replace(".html", "", $file); ?> <span class="demo-showdetails"></span>
                </h1>

                <div class="demo-rendered">
                    <?php include($patterns_dir . '/' . $file); ?>
                </div>

                <div class="demo-details row">

                    <div class="col-sm-6">
                        <h4 class="demo-subtitle">Code Example</h4>
                        <pre class="demo-code"><code><?php echo $html ?></code></pre>
                    </div>

                    <div class="col-sm-6">
                        <h4 class="demo-subtitle">Usage Notes</h4>
                        <p class="demo-notes">
                            <?php echo $Parsedown->text($md); ?>

                            <div class="demo-keywords">
                                <?php
                                    // content for our javascript filtering
                                    echo str_replace(".html", "", $file) . " ";
                                    echo $md;
                                ?>
                            </div>
                        </p>
                    </div>

                </div>
            </article>

        <?php endforeach;
    ?>
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script> <!-- dependency for production -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script> <!-- not needed for production -->
<script src="/js/moment.js"></script> <!-- dependency for production -->
<script src="/js/list.js"></script> <!-- dependency for production -->
<script src="/js/chosen.js"></script> <!-- dependency for production -->
<script src="/js/bootstrap-datepicker.js"></script> <!-- dependency for production -->
<script src="/js/bootstrap-timepicker.js"></script> <!-- dependency for production -->

<script src="/js/jquery.scroll-reader.js"></script> <!-- not needed for production -->
<script src="/js/styleguide.js"></script> <!-- not needed for production -->

<script src="/js/widgets.js"></script> <!-- dependency for production -->

</body>
</html>
