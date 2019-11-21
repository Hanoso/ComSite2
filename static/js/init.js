// JavaScript Document
var original_active_idx = '';
var test = window.location.pathname;
var txt = test.split('/');
var one = txt[1];

if(one == 'about_us'){
	original_active_idx = 1;
}else if(one == 'products'){
	original_active_idx = 2;
}else if(one == 'service_support'){
	original_active_idx = 3;
}else if(one == 'news'){
	original_active_idx = 4;
}else if(one == 'contact_us'){
	original_active_idx = 5;
}else if(one == 'Video'){
	original_active_idx = 7;
}else{
	original_active_idx = 0;
}


jQuery(function(){
	
	//js_fancybox_trigger
	jQuery('.js_fancybox_trigger').each(function(){
	    var fancy_options = {
		 'padding':0,
		 'scrolling':'no'	
		};			
		jQuery(this).fancybox(fancy_options);
	});//end js_fancybox_trigger

	//js_label_input
	jQuery('.js_label_input').each(function(){
	   jQuery(this).label_input();	
	});
		
	//START jQuery('.js_smart_city').each
	/*jQuery('.js_smart_city').each(function(){
		var $root = jQuery(this);
		$root.smart_city();		
	});*///end jQuery('.js_smart_city').each
	
	//START js_tab 
	jQuery('.js_tab').each(function(){
		jQuery(this).tab('click');
	});//end js_tab
	
	//js_side_nav_multi	
	jQuery('.js_side_nav_multi').each(function(){
		var $root = jQuery(this);		
		var $ul_level_2 = $root.find('ul.level_2');		
		var $switch = $root.find('span.lev1');
		
		$root.find('li.lev1').each(function(){
			var $this = jQuery(this);
			if($this.hasClass('active')){
				$this.addClass('open');
			};
		});
		
		$switch.each(function(){
			var $this = jQuery(this);
			var $ul = $this.siblings('ul.level_2');
			var $p = $this.parent('li.lev1');
			
			$this.click(function(){
				if($p.hasClass('open')){
					
				}else{
					$p.addClass('open');
					$p.siblings('li.lev1').removeClass('open').removeClass('active');
					return; 
				};
			});
		});
		
	});//end js_side_nav_multi
	
	
	
	//START jQuery('.js_pro_des_cover').each()
	jQuery('.js_pro_des_cover').each(function(){
		var $root = jQuery(this);
		var $items = $root.find('.js_item');
		
		$items.each(function(){
			var $cover = jQuery(this).find('.js_cover');
			jQuery(this).hover(function(){
			     $cover.show();
			  },function(){
				  $cover.hide();
			});
		});
	});//end jQuery('.js_pro_des_cover').each();
	

	//搜索bar
	jQuery('.js_search_bar').each(function(){
		var $form = jQuery(this).find('form');
		var $btn = jQuery(this).find('.js_se_submit');
		
		$btn.click(function(){
			$form.submit();
		});
	});//end 搜索bar
	
	
	//sns share	
	jQuery('.js_sns_share').each(function(){
	   var $root = jQuery(this);
	   var s_src = '<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>';
	});
	
	//js_ttip_trigger
	
	jQuery('.js_ttip_trigger').each(function(){
		var $root = jQuery(this);
		var $box = $root.find('.js_ttip_box');
		
		$root.hover(function(){
			$box.fadeIn(400);
		},function(){
			$box.fadeOut(400);
		})
	});
	
	
	jQuery('.js_accd_params_info').each(function(){
		var $root = jQuery(this);
		$root.find('.info_cell .cell_tit h3').each(function(){
			var $ahd = jQuery(this);
			var $abd = $ahd.parent().siblings('.info_table');
			$ahd.click(function(){
				if(!$abd.is(':animated')){
				  if($ahd.hasClass('closed')){
					  $abd.slideDown(1,function(){
						  $ahd.removeClass('closed');
					  });
				  }else{
					  $abd.slideUp(1,function(){
						  $ahd.addClass('closed');
					  });
				  };//end if else
				};//end if
			});//end jQuery(this).click
		});//end $root.find('.info_cell .cell_tit h3').each
	});//end jQuery('.js_accd_params_info').each
	
	
	//START product detail page pro_slide
	jQuery('.js_pro_slide').each(function(){
		var $root = jQuery(this);
		var $stage = $root.find('.pic_box');
		var $list = $root.find('.js_list');		
		var $items = $list.find('li');
		var $btn_prev = $root.find('.btn_prev a');
		var $btn_next = $root.find('.btn_next a');
		var len = $items.length;
		var cur_pos_idx = 0;
		var animate_speed = 600;
		var w = $items.outerWidth(true);
		var win_size = 4;
		
		var is_ie6 = (echoLabJS.browserInfo.ie)&&(echoLabJS.browserInfo.version==6);
		var jqzoom_options ={};
		if(is_ie6){			
			jqzoom_options = {  
					zoomType: 'standard',  
					lens:true,  
					preloadImages: true,  
					alwaysOn:false,  
					zoomWidth: 340,  
					zoomHeight: 450,  
					xOffset:10,  
					yOffset:0,  
					position:'right'
			}; 			
		}else{
			jqzoom_options = {  
					zoomType: 'standard',  
					lens:true,  
					preloadImages: true,  
					alwaysOn:false,  
					zoomWidth: 450,  
					zoomHeight: 450,  
					xOffset:10,  
					yOffset:0,  
					position:'right'
			}; 	
		};//end if else
		

		
		$list.width(9999);
		
		$btn_prev.addClass('disabled');
		if(len<=win_size){
			$btn_next.addClass('disabled');
		};
		
		$stage.find('.js_jqzoom').jqzoom(jqzoom_options);  
		
		$items.each(function(){
		   var $this = jQuery(this);	
		   var src_zoom = $this.attr('data-jqzoom-pic');
		   var src_m = $this.find('img').attr('src');		      
		   
		   $this.click(function(){
			   var html = '<a class="js_jqzoom" rel="group" href="' + src_zoom + '"><img src="' + src_m + '" alt="" /></a>' ;
			   $stage.empty();
			   jQuery(html).appendTo($stage);
			   $stage.find('.js_jqzoom').jqzoom(jqzoom_options);  
			   $items.removeClass('active');
			   $this.addClass('active');
		   });		   	
		});//end $items.each
		
		
		
		$btn_prev.click(function(){
			if(cur_pos_idx>0 && (!$list.is(':animated'))){
				cur_pos_idx = cur_pos_idx -1;
				$list.animate({'left':(-cur_pos_idx*w)},animate_speed,function(){
					$btn_next.removeClass('disabled');
					if(cur_pos_idx == 0){
						$btn_prev.addClass('disabled');
					};//end if
				});//end $list.animate
			};//end if
		});//end $btn_prev.click
		
		$btn_next.click(function(){
			if(cur_pos_idx<(len- win_size) && (!$list.is(':animated'))){
				cur_pos_idx = cur_pos_idx + 1;
				$list.animate({'left':(-cur_pos_idx*w)},animate_speed,function(){
					$btn_prev.removeClass('disabled');
					if(cur_pos_idx == (len- win_size)){
						$btn_next.addClass('disabled');
					};//end if
				});//end $list.animate
			};//end if
		});//end $btn_prev.click
				
	});//end product detail page pro_slide
	
	
	//START  service page drop down 
	jQuery('.js_drop_list').each(function(){
		var $root = jQuery(this);
		var $items = $root.find('.js_item');
		
		$items.each(function(){
			var $this = jQuery(this);
			var $box = $this.find('.js_drop_box');
			var h = $this.find('.item_inner').height();
			var offsetY = 1;
			var ori_z_index = 10;
			
			$this.hover(function(){
				$items.css({'z-index':ori_z_index});
				$this.css({'z-index':11});
			    $box.css({'top':(h-offsetY)}).show();
			},function(){
				$this.css({'z-index':ori_z_index});
				$box.hide();
			});		
			
		});		
		
	});//end  service page drop down 
	
	
	//START jQuery('.js_contact_form').each
	jQuery('.js_contact_form').each(function(){
		var $form = jQuery(this);
		var $btn_submit = $form.find('.jsv_submit');

	    var fancy_options = {
		 'padding':0,
		 'scrolling':'no',
		 'onComplete':function(){
			   jQuery('.pop_mod_contact_form_confirm').each(function(){
				  var $pop = jQuery(this);
				  
				  $pop.find('.js_cancel').click(function(){
					jQuery.fancybox.close(); 
					return false;
				  });
				  
				  $pop.find('.jsv_submit').click(function(){
					$form.submit();
					return false;
				  });				   
			   }); 
		  }
		};	
		
		$form.find('.js_contact_form_confirm_trigger').fancybox(fancy_options);
		
		$btn_submit.click(function(){
			if($form.validate_form()){
			   	$form.find('.js_contact_form_confirm_trigger').trigger('click');
				return false;
			}else{				
				return false;
			};//end if
		});
	});//end jQuery('.js_contact_form').each
	
	
	//START jQuery('.js_cus_support_form').each
	jQuery('.js_pop_confirm_form').each(function(){
		var $form = jQuery(this);
		var $btn_submit = $form.find('.js_fancy_confirm_trigger');

	    var fancy_options = {
		 'padding':0,
		 'scrolling':'no',
		 'onComplete':function(){
			   jQuery('.js_pop_form_confirm_box').each(function(){
				  var $pop = jQuery(this);
				  
				  $pop.find('.js_cancel').click(function(){
					jQuery.fancybox.close(); 
					return false;
				  });
				  
				  $pop.find('.jsv_submit').click(function(){
					$form.submit();
					return false;
				  });				   
			   }); 
		  }
		};	
		
		$form.find('.js_pop_form_confirm_trigger').fancybox(fancy_options);
		
		$btn_submit.click(function(){
			//console.log('a')
			if($form.validate_form()){
			   	$form.find('.js_pop_form_confirm_trigger').trigger('click');
				return false;
			}else{				
				return false;
			};//end if
		});
	});//end jQuery('.js_cus_support_form').each
	
	
	//START jQuery('.js_fw_slide').each
	jQuery('.js_fw_slide').each(function(){
		var $root = jQuery(this);
		var $stage = $root.find('.js_stage');
		var $holder = $root.find('.js_holder');
		var $items = $root.find('.js_source .js_item');
		var len =  $items.length;
		var fade_speed = 1000;
		var $last_img = $stage.find('.js_item');
		var n=1;
		var stop_flag = false;

			//START function addimg(index){}	
			function addimg(i,speed){			 
				if($last_img){
					$last_img.fadeOut(speed,function(){
					  jQuery(this).remove();
					});	
				};				

				$last_img = $items.eq(i).clone().css({
					'display':'none'
				}).appendTo($stage).fadeIn(speed);	 				
				
				$holder.find('a').removeClass('active');
				$holder.find('a').eq(i).addClass('active');
			};//END function addimg(i){}	
			
			var html_btn = '';
			for(var i=0;i<len;i++){
				html_btn = html_btn + '<a href="javascript:;"></a>';		
			};//end for
			jQuery(html_btn).appendTo($holder);
			
			$holder.find('a').each(function(index){
				jQuery(this).click(function(){
					 addimg(index,fade_speed);	
					 if(index==(len-1)){n=0;}else{n=index+1;};
				});
		   });	//end 	$holder.find('a').each		   
		   $holder.find('a:first').addClass('active');
						
			$stage.hover(function(){stop_flag = true},function(){stop_flag = false});			
			
			if(!stop_flag){
				var Timer_2=window.setInterval(function(){
					addimg(n,fade_speed);						
					n++;
					if(n>=len){
						n=0;
					};//END if							
				},5000);//END Timer_2	
			};//END if

	});//end jQuery('.js_fw_slide').each
	
	
	//START js_slider_gallery 	
	jQuery('.js_slider_gallery').each(function(){
		var $root = jQuery(this);
		var $stage = $root.find('.js_stage');
		var $text = $root.find('.info_text');
		var $btn_prev = $root.find('.js_btn_prev');
		var $btn_next = $root.find('.js_btn_next');
		var $items = $root.find('.js_source .js_item');
		var len = $items.length;		
		var $range_list = $root.find('.js_range_list');
		var $slider = $root.find('.js_slider');		
		var animate_speed = 400;
		var animate_style = 'easeInOutExpo';			
		var win_size = 5;
		var cur_left = 0;	
		var cur_index = 0;//
		var $btn_wrap = $root.find('.btns');
		var html ='';
		var html_li = '';
		var stop_flag = false;
		var k = 1;	
		
		for(var i=0;i<len;i++){
		   var $this = $items.eq(i);
		   html_li = html_li + '<li>' + $this.find('.year').text() + '</li>';
		   html = html + '<a href="javascript:;"></a>';	
		};//end for
		jQuery(html).appendTo($btn_wrap);
		jQuery(html_li).appendTo($range_list);
		var w = $range_list.find('li').outerWidth(true);
		
		
		//START function __show()
		function display(idx){	
		   	//内容替换部分
			function show(){
			  var $this = $items.eq(idx);
			  var src = $this.find('.pic img').attr('src');
			  
			  $btn_wrap.find('a').removeClass('active').eq(idx).addClass('active');
			  $stage.find('img').attr('src',src);
			  $text.html($this.find('.des').text());		
			}
			
			//list位置部分,判断idx是否处于可见区域，若在可见区域，无需移动list,若不在，需要移动list
			var visible_min = Math.abs($range_list.position().left)/w;
			var visible_max = visible_min + (win_size-1);
			
			if((idx>=visible_min)&&(idx<=visible_max)){//处于可见区域，无需移动list,仅需改变ui.value			
			  show();
			  $slider.slider( 'option', 'value', (idx-visible_min) );	
			  cur_index = idx;			  		  
			}else{//不在可见区域，需要移动list	
			  //两个break_point 0 和 （len-1）	
			  if(idx==0){
				$range_list.animate({'left':0},animate_speed,animate_style,function(){
				   show();				   				 
				});//end $range_list.animate
				$slider.slider( 'option', 'value', 0 );	
				
			  }else if(idx==(len-1)){
				$range_list.animate({'left':-w*(len-win_size)},animate_speed,animate_style,function(){
				   show();				   				 
				});//end $range_list.animate
				$slider.slider( 'option', 'value', (win_size-1) );	
				
			  }else if(idx<cur_index){//往较小方向运动
				$range_list.animate({'left':($range_list.position().left+w)},animate_speed,animate_style,function(){
				   show();				  	   			 
				});//end $range_list.animate 
				$slider.slider( 'option', 'value', 0 );	
				 	 
			  }else if(idx>cur_index){//往较大值方向运动
				$range_list.animate({'left':($range_list.position().left-w)},animate_speed,animate_style,function(){
				   show();				   			 
				});//end $range_list.animate  
				$slider.slider( 'option', 'value', (win_size-1) );		
				   
			  };//end if else 
	  
			};//end if else	
			
			cur_index = idx;
			 k = idx;
		}//END function __show()
		
		
		//START $slider.slider({})
		$slider.slider({
		  range: "max",
		  min: 0,
		  max: win_size-1,
		  value: 0,
		  slide: function( event, ui ) {	
		      cur_index = ui.value + (Math.abs($range_list.position().left)/w);		  
              display(cur_index);			  		
		  }//end slide funtion		 
		});//end $slider.slider()	
		
		//START $btn_wrap.find('a') reg click
		$btn_wrap.find('a').each(function(idx){
			jQuery(this).click(function(){	
			   			
				display(idx);
			});
		});//end $btn_wrap.find('a') reg click
		
		
		//START $btn_next.click		
		$btn_next.click(function(){
			if(!$range_list.is(':animated')){
			  var m ;				
			  if(cur_index==(len-1)){
				  m =0;
			  }else{
				  m = cur_index + 1;
			  };//end if else 		
			  $btn_wrap.find('a').eq(m).trigger('click');			  
			};//end if
		});//end $btn_next.click
		
		//START reg $btn_prev.click
		$btn_prev.click(function(){
			if(!$range_list.is(':animated')){
			  var m ;
			  if(cur_index==0){
				  m =(len-1);
			  }else{
				  m = cur_index - 1;
			  };//end if			
			  $btn_wrap.find('a').eq(m).trigger('click');
			};//end if
		});//end reg $btn_prev.click	
		
			
		
		 $range_list.find('li').each(function(idx){
			 jQuery(this).click(function(){
				 $btn_wrap.find('a').eq(idx).trigger('click');
			 });			  
		 });
		 
		 $root.find('.holder .loading_layer').hide();
		 
		 $btn_wrap.find('a').eq(0).trigger('click');

		
		$root.hover(function(){stop_flag=true;},function(){stop_flag=false;});
		
		
	
		var Timer2 = window.setInterval(function(){
			if(!stop_flag){
			  $btn_wrap.find('a').eq(k).trigger('click');	
			  k = k +1;
			  if(k==len){
				  k =0 ;
			  };//end if
			};//end if			
		},5000);
		
	});//end js_slider_gallery 
	
	jQuery('#header').each(function(){
		var $root = jQuery(this);
		var $lev2_div = $root.find('.js_lev2_div');
		var $lev_1 = $root.find('li.lev_1');
		//var original_active_idx = $root.find('li.lev_1').filter('.active').index();		
				
		$lev_1.each(function(){
			var $this_item = jQuery(this);
			var $level_2_ul = $this_item.find('.js_level_2');
			$this_item.mouseover(function(){
			if ($level_2_ul.length>0){
			    $lev_1.removeClass('active');
				$this_item.addClass('active');
				$lev2_div.show();
			    $level_2_ul.show();
			}
			else {				
			    $lev_1.removeClass('active');
				$this_item.addClass('active');
			};			    
			}).mouseleave(function(){
			    $this_item.removeClass('active');
				$lev_1.eq(original_active_idx).addClass('active');
			    $lev2_div.hide();
			    $level_2_ul.hide();
			});	
		});
		
	});
	
	
})