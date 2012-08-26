<?php
class friendlyze{
	private static $target = array(
			'js' => array(
				// comma and space
				'/,([^\s])/', ', $1',
				//2dot with no space
				'/([^\s]):([^\s])/', '$1 : $2',
				
				//++
				'/\+\+/','+= 1',
				
				'/\;\}/','; }',
				'/function\(/','function (',
				'/\)\{/',') {',
				'/\s*$/', '', //end spaces
				'/\n{2,}/m', "\n", //empty lines
				// for basicoperators
				'/([^\s])([+=|=|+|*|\/|-])/i', '$1 $2',
				'/([=|+|*|\/|-])([^\s\n])/i', '$1 $2',
				
				
				
				//if, while, for
				'/(if|while|for)\(/','$1 ('
				
			),
			'css' => array(
				'/\;\}/','; }',
				'/function\(/','function ('
			)
		),
		$root_folder,
		$relative_folder = false,
		//if set new files will be created prepending it to the name
		$create_new = '_',
		$excludes = array(
			'folders' =>array('script'),
			'files'=>array('jquery-1.7.2.min.js', 'jmvc..pack.js','analytics.js')
		),
		$br = "\n",
		$current_ext='',
		$version = '0.1',
		$head_name = 'Friendlizer';
	
	
	
	
	private static function make_head(){
		$mid = '# '.self::$head_name.' v '.self::$version.' #';
		$l = strlen($mid);
		$topdown = str_repeat('#', $l);
		return  implode("\n",array('',$topdown, $mid, $topdown,'' ));
	}
	
	private static function huntfile($folder, &$ret, $toremove=false){
		$f = scandir($folder);
		$l = strlen(self::$current_ext);
		foreach($f as $file){
			
			if(is_file($folder.$file) &&
				substr($file, -($l+1) )=='.'.self::$current_ext &&
				!in_array($file, self::$excludes['files']) ){
					if( ( $toremove &&  self::$create_new!=='' && substr($file, 0, 1) == self::$create_new) 
						||
						!$toremove && substr($file, 0, 1) !== self::$create_new){
						$ret[] = $folder.$file;
					}
				
			}elseif(substr($file,0,1)!=='.' && is_dir($folder.$file)){
				//echo 'is dir : '.$folder.$file."\n";
				if(!in_array($file,self::$excludes['folders'])){
					self::huntfile($folder.$file.'/', $ret, $toremove);
				}
			}
		}
		return $ret;
	}
	
	private static function adjust($files){
		if(!self::$create_new || strlen(self::$create_new)==0){die('`pre` param not set '.self::$br); exit;}
		//echo self::$br;
		echo 'applying rules... ';
		foreach($files as $file){
			$content = file_get_contents($file);
			for($i =0, $l= count(self::$target[self::$current_ext]); $i<$l-1; $i+=2){
				$find = self::$target[self::$current_ext][$i];
				$replacement = self::$target[self::$current_ext][$i+1];
				$content = preg_replace($find, $replacement, $content);
			}
			$new_file = dirname($file).'/'.self::$create_new.basename($file);
			$res = file_put_contents($new_file, $content);
			if(!$res){die('Sorry, something went wrong writing `'.$new_file.'`'.'\n\n');}
		}
		echo 'done!'.self::$br;
	}
	private static function delete($files){
		echo 'deleting... ';
		$lenght = false;
		foreach($files as $file){
			if($lenght){echo str_repeat(chr(8), $lenght);}
			$res = unlink ($file);
			if(!$res){die('Sorry, something went wrong deleting `'.$file.'`'.'\n\n');}
		}
		echo 'done!'.self::$br;
	}
	
	
	public static function set_path($path){
		if(substr($path, 0, 1) == '/'){
			die('It seems you are looking for trouble, but I`been mecriful this time !!!'.self::$br);
			exit;
		}
		if(!is_dir(realpath(dirname(__FILE__).'/'.$path))){
			die('Sorry, path `'.dirname(__FILE__).'/'.$path.'` cannot be found'.self::$br);
			exit;
		}
		self::$relative_folder = $path;
	}
	public static function clean(){
		echo self::make_head();
		foreach(self::$target as $ext => $subst){
			self::$current_ext = $ext;
			echo '> Looking for `'.self::$create_new.'******.'.$ext.'` files to be removed : ';
			self::$root_folder = realpath(dirname(__FILE__).'/'.self::$relative_folder ).'/';
			$files = array();
			$files = self::huntfile(self::$root_folder, $files, true);
			
			$size = count($files);
			echo $size.' file'.($size!=1?'s':'').' have been found';	
			echo self::$br;
			//print_r($files);
			self::delete($files);
		}
		if($size>0){
			echo 'Files successfully deleted'.self::$br;
		}
	}
	
	public static function check($file){
		echo self::make_head();
		foreach(self::$target as $ext => $subst){
			self::$current_ext = $ext;
			echo '> Looking for `'.$ext.'` file: ';
			self::$root_folder = realpath(dirname(__FILE__).'/'.self::$relative_folder ).'/';
			$files = array();
			$files = self::huntfile(self::$root_folder, $files);
			$size = count($files);
			echo $size.' file'.($size!=1?'s':'').' have been found';
			echo self::$br;
			//print_r($files);
			self::adjust($files);
		}
		
		if($size>0){
			echo 'Files successfully written'.self::$br;
		}
	}	
}
$usage = "USAGE:\nphp frieldyze.php relativepath_with_end_slash [adjust | clean]\nbye\n";
if(count($argv)== 3){
	friendlyze::set_path($argv[1]);
	switch(true){
		case $argv[2] === 'clean':
			friendlyze::clean();
		break;
		case $argv[2] === 'adjust':
			friendlyze::check();
		break;
		default :
			echo $usage;
			echo 'Maybe You should try to use `adjust` or `clean` as third parameter'."\n\n";
		break;
	}
}else{
	echo $usage;
}