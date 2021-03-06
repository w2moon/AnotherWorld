(function () {
    if (USE_CCB) {
        wl.winscale = cc.Director.getInstance().contentScaleFactor();
    }
    else {
        wl.winscale = cc.Director.getInstance().getContentScaleFactor()
    }

    wl.get = function (name) {
        return cc.UserDefault.getInstance().getStringForKey(name)
    };

    wl.set = function (name, value) {
        cc.UserDefault.getInstance().setStringForKey(name, value)
    };

    wl.foreach_ifcall = function (obj, func, funcname, v) {
        var arr = obj.getChildren();
        if (obj[funcname] != null) {
            obj[funcname](v);
        }
        for (var i = 0; i < arr.length; ++i) {
            wl.foreach_call(arr[i], funcname, v);
        }
    };

    wl.get_time = function () {
        var t = new Date();
        return t.getTime();
    };
    wl.day_distance = function (d1, d2) {//second,if > 0,d2 is the future
        var t1 = new Date(d1 * 1000);
        var t2 = new Date(d2 * 1000);
        t1.setMinutes(0);
        t1.setHours(0);
        t1.setSeconds(0);
        t2.setMinutes(0);
        t2.setHours(0);
        t2.setSeconds(0);
        return (t2 - t1) / (24 * 3600);
    }

    wl.popmsg = function (msg, parent, func, funcowner) {
        if (parent == null) {
            parent = wl.get_scene();
        }
        wl.foreach_ifcall(parent, function () { return true; }, "setEnabled", false);
        var ui = wl.load_scene("infobox", msg, func, funcowner);

        var size = parent.getContentSize();
        ui.setPosition(size.width / 2, size.height / 2);
        parent.addChild(ui, 1000);
    };

    wl.warn_obj = function (obj) {
        obj.setScale(1);
        obj.runAction(cc.Sequence.create(cc.ScaleTo.create(0.2, 1.3), cc.ScaleTo.create(0.2, 1)));
    };

    wl.repeat_anim = function (o, anim) {
        o.animationManager.runAnimationsForSequenceNamed(anim);
        o.animationManager.setCompletedAnimationCallback(o, function () { this.animationManager.runAnimationsForSequenceNamed(anim); });

    };

    wl.create_soulcard = function (soulbaseid, flip) {
        var soul = soulbase[soulbaseid];
        var avatar = parse_action_params(soul.avatar);
        var ske = avatar[0];
        if (flip) {
            ske = ske + "_flip";
        }
        avatar.shift();
        return wl.load_scene("uicard", ske, avatar, "");
    };

    wl.create_animation = function (dt, filename, framenum, colnum) {

        var arr = [];
        var animation = cc.Animation.create();
        if (USE_CCB) {
            animation.setDelayPerUnit(dt);
        }
        else {
            animation.initWithSpriteFrames(arr, dt);
        }


        if (typeof (filename) == "object") {
            var istart = wl.tonumber(filename[1]);
            var iend = wl.tonumber(filename[2]);

            for (var i = istart; i <= iend; ++i) {

                animation.addSpriteFrameWithFile(filename[0] + i + ".png");
            }
        }
        else {
            if (framenum == null) {
                cc.log("create animation need framenum and colnum");
            }
            var texture = cc.TextureCache.getInstance().addImage(filename);
            var frame = cc.SpriteFrame.createWithTexture(texture, cc.rect(0, 0, texture.contentSize().width, texture.contentSize().height));

            var rownum = Math.ceil(framenum / colnum);
            var uw = parseInt(texture.contentSize().width / colnum);
            var uh = parseInt(texture.contentSize().height / rownum);

            for (var row = 0; row < rownum; ++row) {
                for (var col = 0; col < colnum; ++col) {

                    if (USE_CCB) {

                        animation.addSpriteFrameWithTextureRect(texture, cc.rect(col * uw, row * uh, uw, uh));
                    }
                    else {
                        animation.addSpriteFrameWithTexture(texture, cc.rect(col * uw, row * uh, uw, uh));
                    }
                }
            }
        }

        return animation;
    };

    wl.play_animation = function (node, x, y, dt, animfile, loop) {
        var arr = animfile.split(/;/);
        var anim = null;

        var spr = null;
        if (arr.length > 1) {
            anim = wl.create_animation(dt, arr);
            spr = cc.Sprite.create(arr[0] + arr[1] + ".png");

        }
        else {
            arr = animfile.split(/:/);
            anim = wl.create_animation(dt, arr[0], wl.tonumber(arr[1]), wl.tonumber(arr[2]));
            var tex = cc.TextureCache.getInstance().textureForKey(arr[0]);
            var rownum = Math.ceil(wl.tonumber(arr[1]) / wl.tonumber(arr[2]));
            var uw = parseInt(tex.contentSize().width / wl.tonumber(arr[2]));
            var uh = parseInt(tex.contentSize().height / rownum);
            spr = cc.Sprite.create(arr[0], cc.rect(0, 0, uw, uh));
        }
        var animate = cc.Animate.create(anim);
        var action = null;
        if (loop != null && loop != false) {
            action = cc.RepeatForever.create(animate);
        }
        else {
            action = cc.Sequence.create(animate, cc.CallFunc.create(spr.removeFromParent, spr));
        }

        spr.setPosition(x, y);
        node.addChild(spr);
        spr.runAction(action);

        return spr;
    };

    wl.play_animation_delay = function (node, delay, x, y, dt, animfile, loop) {
        var arr = animfile.split(/;/);
        var anim = null;

        var spr = null;
        if (arr.length > 1) {
            anim = wl.create_animation(dt, arr);
            spr = cc.Sprite.create(arr[0] + arr[1] + ".png");

        }
        else {
            arr = animfile.split(/:/);
            anim = wl.create_animation(dt, arr[0], wl.tonumber(arr[1]), wl.tonumber(arr[2]));
            var tex = cc.TextureCache.getInstance().textureForKey(arr[0]);
            var rownum = Math.ceil(wl.tonumber(arr[1]) / wl.tonumber(arr[2]));
            var uw = parseInt(tex.contentSize().width / wl.tonumber(arr[2]));
            var uh = parseInt(tex.contentSize().height / rownum);
            spr = cc.Sprite.create(arr[0], cc.rect(0, 0, uw, uh));
        }
        spr.setVisible(false);
        var animate = cc.Animate.create(anim);
        var action = null;
        if (loop != null && loop != false) {
            action = cc.Sequence.create(cc.DelayTime.create(delay), cc.Show.create(), cc.RepeatForever.create(animate));
        }
        else {
            action = cc.Sequence.create(cc.DelayTime.create(delay), cc.Show.create(), animate, cc.CallFunc.create(spr.removeFromParent, spr));
        }

        spr.setPosition(x, y);
        node.addChild(spr);
        spr.runAction(action);

        return spr;
    };

    wl.ansi_length = function (s) {
        return s.replace(/[^\x00-\xff]/g, "**").length
    };

    wl.analyze_string = function (s) {
        var starttoken = null;
        var lasttoken = 0;
        var arr = [];
        for (var i = 0; i < s.length; ++i) {
            if (starttoken == null && s[i] == "[") {
                starttoken = i + 1;
                arr.push(s.substr(lasttoken, i - lasttoken));
                continue;
            }

            if (s[i] == "]") {

                lasttoken = i + 1;
                arr.push(s.substr(starttoken, i - starttoken).split(":"));
                starttoken = null;
            }
            else if (s.length - 1 == i) {
                arr.push(s.substr(lasttoken, i - lasttoken + 1));
            }


        }
        return arr;

    };


    wl.clipping_layer = function (w, h) {
        if (USE_CCB) {
            return cc.Layer.create();
        }
        var clipper = cc.ClippingNode.create();
        clipper.setContentSize(cc.size(w, h));

        var drawnode = cc.DrawNode.create();
        var rect = [cc.p(0, 0), cc.p(w, 0), cc.p(w, h), cc.p(0, h)];

        var white = cc.c4f(1, 1, 1, 1);
        drawnode.drawPoly(rect, white, 1, white);
        clipper.setStencil(drawnode);


        return clipper;
    };

    wl.scroll_layer = function (w, h) {
        if (USE_CCB) {
            var layer = cc.Layer.create();
            layer.__addChild = layer.addChild;
            layer.childpos = cc.p(0, 0);
            layer.addChild = function (n, l) {
                n.setPosition(this.childpos);
                this.childpos.y += n.controller.bg.getContentSize().height + 30;
                this.__addChild(n);
            };
            return layer;
        }
        var container = cc.Layer.create();
        container.setAnchorPoint(cc.p(0, 0));
        container.setPosition(cc.p(0, 0));
        var size = cc.size(w, h);

        container.setContentSize(size);


        var scroll = cc.ScrollView.create(size, container);
        scroll.updateContainerSize = function (width, height) { container.setContentSize(w, h); };
        scroll.setDirection(1);
        scroll.setBounceable(true);
        return scroll;
    };

    wl.foreach_call = function (obj, funcname, v) {
        var arr = obj.getChildren();
        if (obj[funcname] != null) {
            obj[funcname](v);
        }
        for (var i = 0; i < arr.length; ++i) {
            wl.foreach_call(arr[i], funcname, v);
        }
    }

    wl.shake = function (dw, dh, dt, num, obj) {
        var arr = [];
        var pos = obj.getPosition();
        for (var i = 0; i < num; ++i) {
            arr.push(cc.MoveTo.create(dt / num, cc.p(pos.x + (wl.sysrand() - 0.5) * dw, pos.y + (wl.sysrand() - 0.5) * dh)));
        }
        obj.runAction(cc.Sequence.create.apply(cc.Sequence, arr));
    };

    wl.fade = function (obj, dt, from, to, func, funcowner) {

        var num = parseInt(dt / 0.016);
        var cur = 0;
        var seq = cc.Sequence.create(
                        cc.DelayTime.create(0.016),
                        cc.CallFunc.create(function () {
                            cur++;
                            var v = to + (1 - cur / num) * (from - to);
                            wl.foreach_call(obj, "setOpacity", v);

                        })
                                       );
        if (func == null) {
            obj.runAction(cc.Sequence.create(cc.Repeat.create(seq, num)));

        }
        else {
            obj.runAction(cc.Sequence.create(cc.Repeat.create(seq, num), cc.CallFunc.create(function () { func.apply(funcowner); })));
        }


    };

    wl.fade_delay = function (obj, delay, dt, from, to, func, funcowner) {

        var num = parseInt(dt / 0.016);
        var cur = 0;
        var seq = cc.Sequence.create(
                        cc.DelayTime.create(0.016),
                        cc.CallFunc.create(function () {
                            cur++;
                            var v = to + (1 - cur / num) * (from - to);
                            wl.foreach_call(obj, "setOpacity", v);

                        })
                                       );
        if (func == null) {
            obj.runAction(cc.Sequence.create(cc.DelayTime.create(delay), cc.Repeat.create(seq, num)));

        }
        else {
            obj.runAction(cc.Sequence.create(cc.DelayTime.create(delay), cc.Repeat.create(seq, num), cc.CallFunc.create(function () { func.apply(funcowner); })));
        }
    };

    wl.wait_touch = function (func, funcowner) {
        var rootnode = wl.get_scene();
        var obj = cc.Layer.create();
        obj.setTouchEnabled(true);
        rootnode.addChild(obj);



        obj.onTouchesBegan = function (touches, event) {

            var loc = touches[0].getLocation();
            obj.removeFromParent();
            obj = null;
            func.apply(funcowner);

            return true;
        };
        obj.onMouseDown = function (event) {

            var loc = event.getLocation();
            obj.removeFromParent();
            obj = null;
            func.apply(funcowner);

            return true;
        };
    };

    wl.filter_rate = function (arr) {
        var r = 0;
        var todelete = []
        for (var k in arr) {
            r = wl.rand();
            if (r < arr[k][0]) {
                todelete.push(arr[k]);
            }
        }

        for (var k in todelete) {
            for (var k in arr) {
                if (todelete[k] == arr[k]) {
                    arr.splice(k, 1);
                    break;
                }
            }
        }
    };

    wl.parse_reward = function (str) {
        var parts = str.split(/;/);
        var arr = [];
        var spled, tmp
        for (var i = 0; i < parts.length; ++i) {
            spled = parts[i].split(/,/);
            var tmp = spled[1].match(/\(([\w,.]+)\)/)[1].split(/,/);
            for (var k in tmp) {
                tmp[k] = wl.tonumber(tmp[k])
            }
            arr.push([wl.tonumber(spled[0]), spled[1].match(/\w+/)[0], tmp])
        }
        return arr;

    };

    wl.get_scene = function () {
        return cc.Director.getInstance().getRunningScene().getChildren()[0];
    }

    wl.run_scene = function (s) {
        var director = cc.Director.getInstance();
        var scene = cc.BuilderReader.loadAsScene(s);
        var runningScene = director.getRunningScene();
        if (USE_VIRTUAL_HTTP) {
            wl.http.attach(scene);
        }
        if (runningScene === null) director.runWithScene(scene);
        else director.replaceScene(scene);




        if (scene.getChildren()[0].controller != null && scene.getChildren()[0].controller.onCreate) {

            if (arguments.length > 1) {
                var args = Array.prototype.slice.call(arguments, 1);
                scene.getChildren()[0].controller.onCreate.apply(scene.getChildren()[0].controller, args);
            }
            else {
                scene.getChildren()[0].controller.onCreate.apply(scene.getChildren()[0].controller);
            }

        }
    };

    wl.load_scene = function (s) {
        var scene = cc.BuilderReader.load(s);


        if (scene.controller != null && scene.controller.onCreate) {

            if (arguments.length > 1) {
                var args = Array.prototype.slice.call(arguments, 1);
                scene.controller.onCreate.apply(scene.controller, args);
            }
            else {
                scene.controller.onCreate.apply(scene.controller);
            }

        }
        return scene;
    };

    wl.clamp = function (v, min, max) {
        if (v < min) {
            v = min;
        }
        if (v > max) {
            v = max;
        }
        return v;
    };

    var v_local_id = null;
    wl.local_id = function () {
        if (v_local_id == null) {
            v_local_id = wl.get("localid");
            if (v_local_id == null) {
                v_local_id = 0;
            }
        }
        v_local_id++;
        wl.set("localid", v_local_id)
        return v_local_id;
    }

    wl.seed = function (seed) {
        return Math.seedrandom(seed);
    };

    wl.rand = function () {
        return Math.random();
    };

    wl.sysrand = function () {
        return Math.sysrandom();
    };
    wl.copyfunc = function (src, dst) {
        for (var k in src) {
            dst[k] = src[k];
        }
    };
    wl.copyarr = function (src, dst) {
        for (var k in src) {
            dst.push(src[k]);
        }
    };

    wl.copy = function (obj) {
        var newobj = {}
        for (var k in obj) {
            if (typeof (obj[k]) == "object") {
                newobj[k] = wl.copy(obj[k]);
            }
            else {
                newobj[k] = obj[k];
            }
        }

        return newobj;
    };

    wl.callstack = function () {
        var i = 0;
        var fun = arguments.callee;
        do {
            fun = fun.arguments.callee.caller;
            cc.log(++i + ': ' + fun);
        } while (fun);
    };

    wl.isNoneString = function (str) {
        return typeof (str) === "undefined" || str === null || str === "";
    };

    wl.toArc = function (d) {
        return d * Math.PI / 180;
    };

    wl.toDegree = function (a) {
        return a * 180 / Math.PI;
    };

    wl.getRotation = function (src, dst) {
        return -wl.toDegree(Math.atan((dst.y - src.y) / (dst.x - src.x)));
    };

    wl.randPosition = function (center, radiusmin, radiusmax) {
        var p = radiusmin + Math.random() * (radiusmax - radiusmin);
        var d = wl.toArc(Math.random() * 360)
        return cc.p(p * Math.cos(d), p * Math.sin(d));
    };

    wl.ccpSub = function (p1, p2) {
        return cc.p(p1.x - p2.x, p1.y - p2.y);
    };

    wl.ccpAdd = function (p1, p2) {
        return cc.p(p1.x + p2.x, p1.y + p2.y);
    };

    wl.set_texture = function (spr, file) {
        if (!USE_CCB) {
            var image = new cc.Image();
            image.initWithImageFile(file, 1);
            var tex = cc.Texture2D.create();
            tex.initWithImage(image);
            spr.setTexture(tex);
        }
    };

    wl.gvars = {
        role: null
    };

    wl.csv_pool = function (file) {

    };

    wl.dict_add = function (d1, d2) {
        var d = {};

        for (var k in d1) {
            if (d2[k] != null) {
                d[k] = d1[k] + d2[k];
            }
            else {
                d[k] = d1[k];
            }
        }
        return d;
    };

    wl.csv_lang = function (file) {

        var ret = {};
        var str = cc.FileUtils.getInstance().getStringFromFile(file);
        var arr = wl.load_csv(str)
        for (var k = 1; k < arr.length; ++k) {
            ret[arr[k][0]] = arr[k][1];

        }
        var lang = function (name) {
            if (ret[name] != null) {
                return ret[name];
            }
            else {
                return name;
            }
        };
        return lang;
    };

    wl.tonumber = function (v) {
        if (typeof (v) != "string" || v == "") {
            return v;
        }
        if (isNaN(v)) {
            return v;
        }
        else {
            if (v.search(/\./) == 0) {
                return parseInt(v);
            }
            else {
                return parseFloat(v);
            }
        }
    };

    wl.csv_cfg = function (file) {

        var ret = {};
        var str = cc.FileUtils.getInstance().getStringFromFile(file);
        var arr = wl.load_csv(str)
        for (var k = 1; k < arr.length; ++k) {
            ret[arr[k][0]] = wl.tonumber(arr[k][1]);
        }
        return ret;
    };

    wl.csv_map = function (file) {

        var ret = {};
        var str = cc.FileUtils.getInstance().getStringFromFile(file);
        var arr = wl.load_csv(str)
        for (var k = 1; k < arr.length; ++k) {

            var obj = {}
            for (var idx in arr[0]) {
                obj[arr[0][idx]] = wl.tonumber(arr[k][idx]);
            }
            ret[obj[arr[0][0]]] = obj;

        }
        return ret;
    };

    wl.csv_idmap = function (file) {

        var ret = {};
        var str = cc.FileUtils.getInstance().getStringFromFile(file);
        var arr = wl.load_csv(str)
        for (var k = 1; k < arr.length; ++k) {
            if (arr[k].length == 1 && arr[k][0] == "") {
                break;
            }
            var obj = {}
            for (var idx in arr[0]) {
                obj[arr[0][idx]] = wl.tonumber(arr[k][idx]);
            }
            ret[wl.tonumber(obj[arr[0][0]])] = obj;

        }
        return ret;
    };

    wl.csv_object = function (file) {

        var ret = [];
        var str = cc.FileUtils.getInstance().getStringFromFile(file);
        var arr = wl.load_csv(str)
        for (var k = 1; k < arr.length; ++k) {
            var obj = {}
            for (var idx in arr[0]) {
                obj[arr[0][idx]] = arr[k][idx];
            }
            ret.push(obj);

        }
        return ret;
    };

    wl.get_rand = function (dictobj) {
        var r = wl.sysrand();
        var v = 0;
        for (var k in dictobj) {
            v = v + dictobj[k].rate;
            if (r < v) {
                return dictobj[k];
            }
        }
        return null;
    };


    wl.load_csv = function (strData, strDelimiter, rowstoread) {
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
                (
        // Delimiters.
                        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

        // Quoted fields.
                        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

        // Standard fields.
                        "([^\"\\" + strDelimiter + "\\r\\n]*))"
                ),
                "gi"
                );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        var numread = 0;
        while (arrMatches = objPattern.exec(strData)) {

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[1];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                numread++;
                if (rowstoread && rowstoread == numread) break;
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push([]);

            }


            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[2]) {

                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                var strMatchedValue = arrMatches[2].replace(
                                new RegExp("\"\"", "g"),
                                "\""
                                );



            } else {

                // We found a non-quoted value.
                var strMatchedValue = arrMatches[3];

            }




            // Now that we have our value string, let's add
            // it to the data array.
            arrData[arrData.length - 1].push(strMatchedValue);


        }
        // Return the parsed data.
        return (arrData);
    };

} ());
