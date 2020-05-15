/* 
Copyright: Paul Hanlon

Released under the MIT/BSD licence which means you can do anything you want 
with it, as long as you keep this copyright notice on the page 
*/
(function(jq){
  jq.fn.jqTreeTable=function(map, options){
    var opts = jq.extend({openImg:"",shutImg:"",leafImg:"",lastOpenImg:"",lastShutImg:"",lastLeafImg:"",vertLineImg:"",blankImg:"",collapse:false,column:0,striped:false,highlight:false,state:true},options),
    mapa=[],mapb=[],tid=this.attr("id"),collarr=[],
	  stripe=function(){
      if(opts.striped){
  		  $("#"+tid+" tr:visible").filter(":even").addClass("even").end().filter(":odd").removeClass("even");
      }
	  },
    buildText = function(parno, preStr){//Recursively build up the text for the images that make it work
      var mp=mapa[parno], ro=0, pre="", pref, img;
      for (var y=0,yl=mp.length;y<yl;y++){
        ro = mp[y];
        if (mapa[ro]){//It's a parent as well. Build it's string and move on to it's children
          pre=(y==yl-1)? opts.blankImg: opts.vertLineImg;
          img=(y==yl-1)? opts.lastOpenImg: opts.openImg;
          mapb[ro-1] = preStr + '<img src="'+img+'" class="parimg" id="'+tid+ro+'">';
          pref = preStr + '<img src="'+pre+'" class="preimg">';
          arguments.callee(ro, pref);
        }else{//it's a child
          img = (y==yl-1)? opts.lastLeafImg: opts.leafImg;//It's the last child, It's child will have a blank field behind it
          mapb[ro-1] = preStr + '<img src="'+img+'" class="ttimage" id="'+tid+ro+'">';
        }
      }
    },
    expandKids = function(num, last){//Expands immediate children, and their uncollapsed children
      jq("#"+tid+num).attr("src", (last)? opts.lastOpenImg: opts.openImg);//
      for (var x=0, xl=mapa[num].length;x<xl;x++){
        var mnx = mapa[num][x];
        jq("#"+tid+mnx).parents("tr").removeClass("collapsed");
  			if (mapa[mnx] && opts.state && jq.inArray(mnx, collarr)<0){////If it is a parent and its number is not in the collapsed array
          arguments.callee(mnx,(x==xl-1));//Expand it. More intuitive way of displaying the tree
        }
      }
    },
    collapseKids = function(num, last){//Recursively collapses all children and their children and change icon
      jq("#"+tid+num).attr("src", (last)? opts.lastShutImg: opts.shutImg);
      for (var x=0, xl=mapa[num].length;x<xl;x++){
        var mnx = mapa[num][x];
        jq("#"+tid+mnx).parents("tr").addClass("collapsed");
        if (mapa[mnx]){//If it is a parent
          arguments.callee(mnx,(x==xl-1));
        }
      }
    },
  	creset = function(num, exp){//Resets the collapse array
  		var o = (exp)? collarr.splice(jq.inArray(num, collarr), 1): collarr.push(num);
      cset(tid,collarr);
  	},
  	cget = function(n){
	  	var v='',c=' '+document.cookie+';',s=c.indexOf(' '+n+'=');
	    if (s>=0) {
	    	s+=n.length+2;
	      v=(c.substring(s,c.indexOf(';',s))).split("|");
	    }
	    return v||0;
  	},
    cset = function (n,v) {
  		jq.unique(v);
	  	document.cookie = n+"="+v.join("|")+";";
	  };
    for (var x=0,xl=map.length; x<xl;x++){//From map of parents, get map of kids
      num = map[x];
      if (!mapa[num]){
        mapa[num]=[];
      }
      mapa[num].push(x+1);
    }
    buildText(0,"");
    jq("tr", this).each(function(i){//Inject the images into the column to make it work
      jq(this).children("td").eq(opts.column).prepend(mapb[i]);
      
    });
		collarr = cget(tid)||opts.collapse||collarr;
		if (collarr.length){
			cset(tid,collarr);
	    for (var y=0,yl=collarr.length;y<yl;y++){
	      collapseKids(collarr[y],($("#"+collarr[y]+ " .parimg").attr("src")==opts.lastOpenImg));
	    }
		}
    stripe();
    jq(".parimg", this).each(function(i){
      var jqt = jq(this),last;
      jqt.click(function(){
        var num = parseInt(jqt.attr("id").substr(tid.length));//Number of the row
        if (jqt.parents("tr").next().is(".collapsed")){//If the table row directly below is collapsed
          expandKids(num, (jqt.attr("src")==opts.lastShutImg));//Then expand all children not in collarr
					if(opts.state){creset(num,true);}//If state is set, store in cookie
        }else{//Collapse all and set image to opts.shutImg or opts.lastShutImg on parents
          collapseKids(num, (jqt.attr("src")==opts.lastOpenImg));
					if(opts.state){creset(num,false);}//If state is set, store in cookie
        }
        stripe();//Restripe the rows
      });
    });
    if (opts.highlight){//This is where it highlights the rows
      jq("tr", this).hover(
        function(){jq(this).addClass("over");},
        function(){jq(this).removeClass("over");}
      );
    };
  };
  return this;
})(jQuery);

// SIG // Begin signature block
// SIG // MIIdEQYJKoZIhvcNAQcCoIIdAjCCHP4CAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // MqtnW6RLrOSGDtOQJDHk21B4zyGIse0tnkmjewFfRKWg
// SIG // ggtpMIIFbDCCBFSgAwIBAgIRAKh1UvVEyZ+hluYBHTOV
// SIG // xU0wDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMCR0Ix
// SIG // GzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4G
// SIG // A1UEBxMHU2FsZm9yZDEYMBYGA1UEChMPU2VjdGlnbyBM
// SIG // aW1pdGVkMSQwIgYDVQQDExtTZWN0aWdvIFJTQSBDb2Rl
// SIG // IFNpZ25pbmcgQ0EwHhcNMTkwNDA5MDAwMDAwWhcNMjAw
// SIG // NDA4MjM1OTU5WjCBtjELMAkGA1UEBhMCR0IxETAPBgNV
// SIG // BBEMCFJHMTQgMVFOMRIwEAYDVQQIDAlCZXJrc2hpcmUx
// SIG // EDAOBgNVBAcMB05ld2J1cnkxJjAkBgNVBAkMHVRoZSBM
// SIG // YXduLCAyMi0zMCBPbGQgQmF0aCBSb2FkMSIwIAYDVQQK
// SIG // DBlNaWNybyBGb2N1cyBHcm91cCBMaW1pdGVkMSIwIAYD
// SIG // VQQDDBlNaWNybyBGb2N1cyBHcm91cCBMaW1pdGVkMIIB
// SIG // IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsLV9
// SIG // cmRmLPSR/tntkEW5tiYsLQsCYJEnY+aoSAak8R6k+q39
// SIG // shXy4COKx2yAFENHKnjunT6ebDdc+uVexBVkj66c5A5g
// SIG // LjUvEu608ZjKzQwnDQJGFkomFFdYlf8/8LsFpkDZNMg5
// SIG // xbcmrwXEHLrVmSLgXFmearg2xzusHxp6Q9uU4L//kPmj
// SIG // K30jxEcYHmhde5HXTrkjxeUvJX3FzgtYebEfVCcJa+Fi
// SIG // mzRYPVfapFILgyv6FA6ZNJamEYf9KzG3cSdNT0kQgqu6
// SIG // 9j2h9zg0jeUaY/aiYHK+YHY+/5HtIGBNB8IKduOW9dJg
// SIG // BNDkR59+HBgLBsKiroht2K/5FHGQLQIDAQABo4IBrDCC
// SIG // AagwHwYDVR0jBBgwFoAUDuE6qFM6MdWKvsG7rWcaA4Wt
// SIG // NA4wHQYDVR0OBBYEFH5MDtmDr6g/F8LVbGMF+51yVK7+
// SIG // MA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMBAf8EAjAAMBMG
// SIG // A1UdJQQMMAoGCCsGAQUFBwMDMBEGCWCGSAGG+EIBAQQE
// SIG // AwIEEDBABgNVHSAEOTA3MDUGDCsGAQQBsjEBAgEDAjAl
// SIG // MCMGCCsGAQUFBwIBFhdodHRwczovL3NlY3RpZ28uY29t
// SIG // L0NQUzBDBgNVHR8EPDA6MDigNqA0hjJodHRwOi8vY3Js
// SIG // LnNlY3RpZ28uY29tL1NlY3RpZ29SU0FDb2RlU2lnbmlu
// SIG // Z0NBLmNybDBzBggrBgEFBQcBAQRnMGUwPgYIKwYBBQUH
// SIG // MAKGMmh0dHA6Ly9jcnQuc2VjdGlnby5jb20vU2VjdGln
// SIG // b1JTQUNvZGVTaWduaW5nQ0EuY3J0MCMGCCsGAQUFBzAB
// SIG // hhdodHRwOi8vb2NzcC5zZWN0aWdvLmNvbTAkBgNVHREE
// SIG // HTAbgRlvdmFkLnR6aW9uQG1pY3JvZm9jdXMuY29tMA0G
// SIG // CSqGSIb3DQEBCwUAA4IBAQA2X8W52EbDZEqNC3zbg70I
// SIG // W/OrguRIqVho+CpMSmOYYAPPAvFK+k8Uvu/dQ20QSsRS
// SIG // 1BDpC18j4aYtDG2dKjm0ow0W/nUioFrX26gmcRWVJ8ns
// SIG // BFcgxeWjyr9g8uTo/T2bUvyuomw8u01dj9mHM+e8EHN6
// SIG // Yda1RauWkURexTrC8h2SJZVfioaP+08tZ4/UCbzcy7FY
// SIG // quHrMci5uOpAsMMNLmDIT6bMjleowoaPd6CM17RI+Dru
// SIG // EMhyhG/izcBjTUS9d7RwNHhytDvkDpKAKyz3vIE34kFp
// SIG // xb2hb6+P2A4xMSWY2j84I6P/G/54+iLfnS0bNl2P9Sig
// SIG // 8tMHYR5ZCgHrMIIF9TCCA92gAwIBAgIQHaJIMG+bJhjQ
// SIG // guCWfTPTajANBgkqhkiG9w0BAQwFADCBiDELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCk5ldyBKZXJzZXkxFDASBgNV
// SIG // BAcTC0plcnNleSBDaXR5MR4wHAYDVQQKExVUaGUgVVNF
// SIG // UlRSVVNUIE5ldHdvcmsxLjAsBgNVBAMTJVVTRVJUcnVz
// SIG // dCBSU0EgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwHhcN
// SIG // MTgxMTAyMDAwMDAwWhcNMzAxMjMxMjM1OTU5WjB8MQsw
// SIG // CQYDVQQGEwJHQjEbMBkGA1UECBMSR3JlYXRlciBNYW5j
// SIG // aGVzdGVyMRAwDgYDVQQHEwdTYWxmb3JkMRgwFgYDVQQK
// SIG // Ew9TZWN0aWdvIExpbWl0ZWQxJDAiBgNVBAMTG1NlY3Rp
// SIG // Z28gUlNBIENvZGUgU2lnbmluZyBDQTCCASIwDQYJKoZI
// SIG // hvcNAQEBBQADggEPADCCAQoCggEBAIYijTKFehifSfCW
// SIG // L2MIHi3cfJ8Uz+MmtiVmKUCGVEZ0MWLFEO2yhyemmcuV
// SIG // MMBW9aR1xqkOUGKlUZEQauBLYq798PgYrKf/7i4zIPoM
// SIG // GYmobHutAMNhodxpZW0fbieW15dRhqb0J+V8aouVHltg
// SIG // 1X7XFpKcAC9o95ftanK+ODtj3o+/bkxBXRIgCFnoOc2P
// SIG // 0tbPBrRXBbZOoT5Xax+YvMRi1hsLjcdmG0qfnYHEckC1
// SIG // 4l/vC0X/o84Xpi1VsLewvFRqnbyNVlPG8Lp5UEks9wO5
// SIG // /i9lNfIi6iwHr0bZ+UYc3Ix8cSjz/qfGFN1VkW6KEQ3f
// SIG // BiSVfQ+noXw62oY1YdMCAwEAAaOCAWQwggFgMB8GA1Ud
// SIG // IwQYMBaAFFN5v1qqK0rPVIDh2JvAnfKyA2bLMB0GA1Ud
// SIG // DgQWBBQO4TqoUzox1Yq+wbutZxoDha00DjAOBgNVHQ8B
// SIG // Af8EBAMCAYYwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNV
// SIG // HSUEFjAUBggrBgEFBQcDAwYIKwYBBQUHAwgwEQYDVR0g
// SIG // BAowCDAGBgRVHSAAMFAGA1UdHwRJMEcwRaBDoEGGP2h0
// SIG // dHA6Ly9jcmwudXNlcnRydXN0LmNvbS9VU0VSVHJ1c3RS
// SIG // U0FDZXJ0aWZpY2F0aW9uQXV0aG9yaXR5LmNybDB2Bggr
// SIG // BgEFBQcBAQRqMGgwPwYIKwYBBQUHMAKGM2h0dHA6Ly9j
// SIG // cnQudXNlcnRydXN0LmNvbS9VU0VSVHJ1c3RSU0FBZGRU
// SIG // cnVzdENBLmNydDAlBggrBgEFBQcwAYYZaHR0cDovL29j
// SIG // c3AudXNlcnRydXN0LmNvbTANBgkqhkiG9w0BAQwFAAOC
// SIG // AgEATWNQ7Uc0SmGk295qKoyb8QAAHh1iezrXMsL2s+Bj
// SIG // s/thAIiaG20QBwRPvrjqiXgi6w9G7PNGXkBGiRL0C3da
// SIG // nCpBOvzW9Ovn9xWVM8Ohgyi33i/klPeFM4MtSkBIv5rC
// SIG // T0qxjyT0s4E307dksKYjalloUkJf/wTr4XRleQj1qZPe
// SIG // a3FAmZa6ePG5yOLDCBaxq2NayBWAbXReSnV+pbjDbLXP
// SIG // 30p5h1zHQE1jNfYw08+1Cg4LBH+gS667o6XQhACTPlNd
// SIG // NKUANWlsvp8gJRANGftQkGG+OY96jk32nw4e/gdREmaD
// SIG // JhlIlc5KycF/8zoFm/lv34h/wCOe0h5DekUxwZxNqfBZ
// SIG // slkZ6GqNKQQCd3xLS81wvjqyVVp4Pry7bwMQJXcVNIr5
// SIG // NsxDkuS6T/FikyglVyn7URnHoSVAaoRXxrKdsbwcCtp8
// SIG // Z359LukoTBh+xHsxQXGaSynsCz1XUNLK3f2eBVHlRHjd
// SIG // Ad6xdZgNVCT98E7j4viDvXK6yz067vBeF5Jobchh+abx
// SIG // KgoLpbn0nu6YMgWFnuv5gynTxix9vTp3Los3QqBqgu07
// SIG // SqqUEKThDfgXxbZaeTMYkuO1dfih6Y4KJR7kHvGfWocj
// SIG // /5+kUZ77OYARzdu1xKeogG/lU9Tg46LC0lsa+jImLWpX
// SIG // cBw8pFguo/NbSwfcMlnzh6cabVgxghEAMIIQ/AIBATCB
// SIG // kTB8MQswCQYDVQQGEwJHQjEbMBkGA1UECBMSR3JlYXRl
// SIG // ciBNYW5jaGVzdGVyMRAwDgYDVQQHEwdTYWxmb3JkMRgw
// SIG // FgYDVQQKEw9TZWN0aWdvIExpbWl0ZWQxJDAiBgNVBAMT
// SIG // G1NlY3RpZ28gUlNBIENvZGUgU2lnbmluZyBDQQIRAKh1
// SIG // UvVEyZ+hluYBHTOVxU0wDQYJYIZIAWUDBAIBBQCgfDAQ
// SIG // BgorBgEEAYI3AgEMMQIwADAZBgkqhkiG9w0BCQMxDAYK
// SIG // KwYBBAGCNwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYB
// SIG // BAGCNwIBFTAvBgkqhkiG9w0BCQQxIgQglNkeJsCwYKPK
// SIG // ILpCMjjd5fo6tr6fCypRg0SaBGJxvvUwDQYJKoZIhvcN
// SIG // AQEBBQAEggEAf/w2Z8ggYYuvzg8etSIC3a+/X8rNQSUB
// SIG // XSyUNa/DTTQP0uTek40mwRijwwdudrRTITPJIi46ENdO
// SIG // PXY3/wlHGV39U7pAX60DQ0aKaO3vfRFCR2Dp39j9H9i2
// SIG // cCOyU/x+AukNbxA3OMAmBIJgPLTL964LOhw/e5Jgax/R
// SIG // lvmgGCSAuO+JtSpZhWHnXXJgLupdDBz1H9PQq9frjVz0
// SIG // qHUQsvdBalx64woY24Lpz3GT8VavV2oMBDJ+X6smVbQx
// SIG // nhcZxOkmd+smwanHx2QkqKE4IYDN8LMukYlsoXiLOLFF
// SIG // 7VG7nTVvXDI69ARknyBx+Y3vHEAR7365u4BBDTqzy0/B
// SIG // wqGCDsEwgg69BgorBgEEAYI3AwMBMYIOrTCCDqkGCSqG
// SIG // SIb3DQEHAqCCDpowgg6WAgEDMQ8wDQYJYIZIAWUDBAIB
// SIG // BQAwgfIGCyqGSIb3DQEJEAEEoIHiBIHfMIHcAgEBBglg
// SIG // hkiG+mwKAwUwMTANBglghkgBZQMEAgEFAAQgfCi93isP
// SIG // elaKZ/zy24rPruSMzShNDiSZnj/YE3iyLL0CBl3JdY3X
// SIG // FhgTMjAxOTExMTgwNzI5NTUuMzk1WjAEgAIB9KB2pHQw
// SIG // cjELMAkGA1UEBhMCQ0ExEDAOBgNVBAgTB09udGFyaW8x
// SIG // DzANBgNVBAcTBk90dGF3YTEWMBQGA1UEChMNRW50cnVz
// SIG // dCwgSW5jLjEoMCYGA1UEAxMfRW50cnVzdCBUaW1lIFN0
// SIG // YW1waW5nIEF1dGhvcml0eaCCCiMwggUIMIID8KADAgEC
// SIG // AhArsXQWm4xCVgAAAABVkekOMA0GCSqGSIb3DQEBCwUA
// SIG // MIGyMQswCQYDVQQGEwJVUzEWMBQGA1UEChMNRW50cnVz
// SIG // dCwgSW5jLjEoMCYGA1UECxMfU2VlIHd3dy5lbnRydXN0
// SIG // Lm5ldC9sZWdhbC10ZXJtczE5MDcGA1UECxMwKGMpIDIw
// SIG // MTUgRW50cnVzdCwgSW5jLiAtIGZvciBhdXRob3JpemVk
// SIG // IHVzZSBvbmx5MSYwJAYDVQQDEx1FbnRydXN0IFRpbWVz
// SIG // dGFtcGluZyBDQSAtIFRTMTAeFw0xODEwMDUyMDMzMjNa
// SIG // Fw0zMDAxMDUyMTAzMjNaMHIxCzAJBgNVBAYTAkNBMRAw
// SIG // DgYDVQQIEwdPbnRhcmlvMQ8wDQYDVQQHEwZPdHRhd2Ex
// SIG // FjAUBgNVBAoTDUVudHJ1c3QsIEluYy4xKDAmBgNVBAMT
// SIG // H0VudHJ1c3QgVGltZSBTdGFtcGluZyBBdXRob3JpdHkw
// SIG // ggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCs
// SIG // W+2jnVYiu2iu1G5Jf0efQGxtUNYNRBXe6ahoDCIEyx+F
// SIG // 456ixgE0PzKK/eZJV/CxRVwuGGPYLyx4TylP4KZYSFO+
// SIG // LpxQfrg2n0WtYv9Z60RedY1rIHKUgVZRbVCzTK00wfbE
// SIG // Dycd6BCB6jnJifF2obFTiN+YwJvqJdkiFuTN/swbW/sC
// SIG // vq5t3jMsMI1oKkylV3GP7mqWywBXDYnaYakjyVdF2Ubi
// SIG // HJNBH7CX2xuXA2slWdYJyOUWGT3UHtGm4fJLE+BCwYcO
// SIG // Ml8LDMoaLNZcmmWx1JK2J+abkZnTOuKMAVv9NREkSat1
// SIG // 0Ak9q4h8sKnqq1UEh2k3yAaqUO0LA7FJAgMBAAGjggFX
// SIG // MIIBUzAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAww
// SIG // CgYIKwYBBQUHAwgwQQYDVR0gBDowODA2BgpghkgBhvps
// SIG // CgMFMCgwJgYIKwYBBQUHAgEWGmh0dHA6Ly93d3cuZW50
// SIG // cnVzdC5uZXQvcnBhMAkGA1UdEwQCMAAwaAYIKwYBBQUH
// SIG // AQEEXDBaMCMGCCsGAQUFBzABhhdodHRwOi8vb2NzcC5l
// SIG // bnRydXN0Lm5ldDAzBggrBgEFBQcwAoYnaHR0cDovL2Fp
// SIG // YS5lbnRydXN0Lm5ldC90czEtY2hhaW4yNTYuY2VyMDEG
// SIG // A1UdHwQqMCgwJqAkoCKGIGh0dHA6Ly9jcmwuZW50cnVz
// SIG // dC5uZXQvdHMxY2EuY3JsMB8GA1UdIwQYMBaAFMPCcdJ7
// SIG // 12gFrjs5mzQlDGIDx1doMB0GA1UdDgQWBBTebMnoBonu
// SIG // BsFn2DaqJb9TmqwmAzANBgkqhkiG9w0BAQsFAAOCAQEA
// SIG // 0dgFq5m2zquXUJFaNG7YNMJ/v8jaWLkXEYmjLT/OpPAT
// SIG // mXHdeLj6DIkZ5iNlvZsyp5DlhUjYclIFY8IWXfnzycp9
// SIG // eZS80MMr4Gx7+l09pWr5O7zJBGaQpTUVMPklpg55FKg1
// SIG // od0phVEyVKPAyGEndu7URM9jHpgxRT/j3fiBH1ERLl5t
// SIG // Ld/wqAeF5xYYmnILlmSDNbb4fes9odUWm9rwOflOMJdF
// SIG // BAjj2Rp6VxrodEqS60TJw+COLvRqreItCw90S/yGWUrY
// SIG // TZFLHegHgMtfdLLR2Dfxwgu6pV/gu+LCC2B19sos4wzl
// SIG // uXkzFMd2Ay1T3L7wny76HpG1uSySfBbpcTCCBRMwggP7
// SIG // oAMCAQICDFjaE/8AAAAAUc4N9zANBgkqhkiG9w0BAQsF
// SIG // ADCBtDEUMBIGA1UEChMLRW50cnVzdC5uZXQxQDA+BgNV
// SIG // BAsUN3d3dy5lbnRydXN0Lm5ldC9DUFNfMjA0OCBpbmNv
// SIG // cnAuIGJ5IHJlZi4gKGxpbWl0cyBsaWFiLikxJTAjBgNV
// SIG // BAsTHChjKSAxOTk5IEVudHJ1c3QubmV0IExpbWl0ZWQx
// SIG // MzAxBgNVBAMTKkVudHJ1c3QubmV0IENlcnRpZmljYXRp
// SIG // b24gQXV0aG9yaXR5ICgyMDQ4KTAeFw0xNTA3MjIxOTAy
// SIG // NTRaFw0yOTA2MjIxOTMyNTRaMIGyMQswCQYDVQQGEwJV
// SIG // UzEWMBQGA1UEChMNRW50cnVzdCwgSW5jLjEoMCYGA1UE
// SIG // CxMfU2VlIHd3dy5lbnRydXN0Lm5ldC9sZWdhbC10ZXJt
// SIG // czE5MDcGA1UECxMwKGMpIDIwMTUgRW50cnVzdCwgSW5j
// SIG // LiAtIGZvciBhdXRob3JpemVkIHVzZSBvbmx5MSYwJAYD
// SIG // VQQDEx1FbnRydXN0IFRpbWVzdGFtcGluZyBDQSAtIFRT
// SIG // MTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
// SIG // ANkj5hSk6HxLhXFY+/iB5nKLXUbDiAAfONCK4dZuVjDl
// SIG // r9pkUH3CEzn7vWa02oT7g9AoH8t26GBQaZvzzk8T4sE+
// SIG // wd8SyzKj+F5EIg7MOumNSblgdMjeVD1BXkNfKEapprfK
// SIG // ECsivFtNW4wXZRKG/Sx31cWgjMrCg+BHV3zncK5iRScx
// SIG // GArUwKQYVVL3YMYES7PdaDJuEB80EbgSeGTx7qng9+Ox
// SIG // Io80WmXLivThRVB035OXpjTm0Ew7nzdJUqdTTp8uZ1zt
// SIG // lvylv3RRiOOqjr3ZsS9fUDAW9FFgImuZy//hVDu5+0Q4
// SIG // pQg5I5tpR/o8xNDnqt9GsuzyihmsKbI4lXUCAwEAAaOC
// SIG // ASMwggEfMBIGA1UdEwEB/wQIMAYBAf8CAQAwDgYDVR0P
// SIG // AQH/BAQDAgEGMDsGA1UdIAQ0MDIwMAYEVR0gADAoMCYG
// SIG // CCsGAQUFBwIBFhpodHRwOi8vd3d3LmVudHJ1c3QubmV0
// SIG // L3JwYTAzBggrBgEFBQcBAQQnMCUwIwYIKwYBBQUHMAGG
// SIG // F2h0dHA6Ly9vY3NwLmVudHJ1c3QubmV0MDIGA1UdHwQr
// SIG // MCkwJ6AloCOGIWh0dHA6Ly9jcmwuZW50cnVzdC5uZXQv
// SIG // MjA0OGNhLmNybDATBgNVHSUEDDAKBggrBgEFBQcDCDAd
// SIG // BgNVHQ4EFgQUw8Jx0nvXaAWuOzmbNCUMYgPHV2gwHwYD
// SIG // VR0jBBgwFoAUVeSB0RGAvtiJuQijMfmhJAkWuXAwDQYJ
// SIG // KoZIhvcNAQELBQADggEBAB0k55p0W6pw/LEOMUXXLAB/
// SIG // ZjoroJo0qqxjbYn5n98Nd/0kI/xPnLdvj/P0H7bB/dYc
// SIG // xIyIZsFjjbpXd9O4Gh7IUa3MYDYah2oo6hFl3sw8LIx0
// SIG // t+hQQ9PMKOgVbBEqnxSVKckFV7VnNug8qYPvQcEhFtN+
// SIG // 9y0RR2Z2YIISaYx2VXMP3y9LXelsI/gH9rV91mlFnFh9
// SIG // YS78eEtDTomRRkQsoFOoRaH2Fli7kRPyS8XfC8Dnril6
// SIG // vUWz53Aw5zSO63r207XR3msTmUazi9JNk3W18W+/3AAo
// SIG // wiW/vOejZTTsPw0dl4z6qogipBg12wWOduMQyCmPY9Cu
// SIG // rBjZ2sSfURIxggNiMIIDXgIBATCBxzCBsjELMAkGA1UE
// SIG // BhMCVVMxFjAUBgNVBAoTDUVudHJ1c3QsIEluYy4xKDAm
// SIG // BgNVBAsTH1NlZSB3d3cuZW50cnVzdC5uZXQvbGVnYWwt
// SIG // dGVybXMxOTA3BgNVBAsTMChjKSAyMDE1IEVudHJ1c3Qs
// SIG // IEluYy4gLSBmb3IgYXV0aG9yaXplZCB1c2Ugb25seTEm
// SIG // MCQGA1UEAxMdRW50cnVzdCBUaW1lc3RhbXBpbmcgQ0Eg
// SIG // LSBUUzECECuxdBabjEJWAAAAAFWR6Q4wDQYJYIZIAWUD
// SIG // BAIBBQCgggFrMBoGCSqGSIb3DQEJAzENBgsqhkiG9w0B
// SIG // CRABBDAvBgkqhkiG9w0BCQQxIgQgnJIck6mPzUAzz7QP
// SIG // d52J7pmd0+QyqFbjMfYWmZnWgeAwggEaBgsqhkiG9w0B
// SIG // CRACDDGCAQkwggEFMIIBATCB5gQUTk3OV7n3pIZY7W8y
// SIG // chYrNPheab0wgc0wgbikgbUwgbIxCzAJBgNVBAYTAlVT
// SIG // MRYwFAYDVQQKEw1FbnRydXN0LCBJbmMuMSgwJgYDVQQL
// SIG // Ex9TZWUgd3d3LmVudHJ1c3QubmV0L2xlZ2FsLXRlcm1z
// SIG // MTkwNwYDVQQLEzAoYykgMjAxNSBFbnRydXN0LCBJbmMu
// SIG // IC0gZm9yIGF1dGhvcml6ZWQgdXNlIG9ubHkxJjAkBgNV
// SIG // BAMTHUVudHJ1c3QgVGltZXN0YW1waW5nIENBIC0gVFMx
// SIG // AhArsXQWm4xCVgAAAABVkekOMBYEFKXMNS4bb3V07OFV
// SIG // xLy0qXYtDR2SMA0GCSqGSIb3DQEBCwUABIIBACk1XOeD
// SIG // lMnttJ9Z9Bfeq98pR/YnzmGCKrd30JGL8p4vp230Gs2W
// SIG // Lzt8PJamfbX/9oUiTVcI9t2ZJNeVPszEygw5fh5DDbut
// SIG // isMy+34wTQF89R+WMzJFMNuM0umh22CJnk4vcj9UU5UR
// SIG // c6d0rBbFpdDoI7RnhAgstFo0PftyzuirmusCDouUN6w8
// SIG // l/wPT9FgwOrQLfXsmE6VdUACIu/dO677eRm33imDxxCM
// SIG // w8ZBMnYthaKfbZLRUhiEy/qBvw0DjbFu/PwWqXWC0Ux5
// SIG // uYaG+Zbfb1du8RlhSWILSX1+lX+dnJ5Ji6t2ZG94Z5OO
// SIG // P3RfLNaJzJXBbIY0yfT3E3eqvC8=
// SIG // End signature block
