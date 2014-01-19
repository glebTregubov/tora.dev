<?php

/**
 * @file
 * Override of preprocess functions.
 */

function tb_nex_preprocess_html(&$vars) {
  
}

function tb_nex_preprocess_page(&$vars) {
  $node_id = drupal_lookup_path('source','404-page');
  if(!empty($node_id)) {
    $parts = explode("/", $node_id);
    $n_id = false;
    if(count($parts) > 1) {
      $n_id = $parts[1];
    }
    if(in_array("page__node__$n_id", $vars['theme_hook_suggestions'])) {
     $vars['theme_hook_suggestions'][] = 'page__404';
    }
  }
  if (isset($vars['node'])) {
    if ($vars['node']->type != 'page') {
      $vars['title'] = "";
      
      $result = db_select('node_type', NULL, array('fetch' => PDO::FETCH_ASSOC))
        ->fields('node_type', array('name'))
        ->condition('type', $vars['node']->type)
        ->execute();
      foreach ($result as $item) {
        $vars['pageType'] = $item['name'];
      }
    }
  }
}

/**
 * Preprocess theme function to print a single record from a row, with fields
 */
function tb_nex_preprocess_views_view_fields(&$vars) {
  if (isset($vars['view']->style_plugin->definition['module']) && 
  ($vars['view']->style_plugin->definition['module'] == 'views_slideshow' ||
  $vars['view']->style_plugin->definition['module'] == 'jcarousel')) {
    $fields = $vars['fields'];
    if(count($fields) >= 5) {
      $fields_key = array_keys($fields);
      $fields[$fields_key[1]]->wrapper_prefix = '<div class="slideshow-group-fields-wrapper">' . $fields[$fields_key[1]]->wrapper_prefix; 
      $fields[$fields_key[count($fields_key) - 1]]->wrapper_suffix = $fields[$fields_key[count($fields_key) - 1]]->wrapper_suffix . '</div>'; 
    }
  }
}

function tb_nex_preprocess_node(&$vars) {
  // process theme style
  $skins = nucleus_get_predefined_param('skins', array('default' => t("Default skin")));
  foreach ($skins as $key => $val) {
    if ($vars['node_url'] == base_path() . 'skin/' . $key && (!isset($_COOKIE['nucleus_skin']) || $_COOKIE['nucleus_skin'] != $key)) {
      setcookie('nucleus_skin', $key, time() + 100000, "/");
      header('Location: ' . $vars['node_url']);
    }
  }
  if($vars['type'] == 'blog'){
    $vars['created_day'] = date('d', $vars['created']);
    $vars['created_month'] = date('M', $vars['created']);
    
    $vars['tb_methys_ii_first_image'] = false;
    foreach($vars['content'] as $key => $image) {
      if(isset($image['#field_type']) && isset($image['#weight']) && $image['#field_type'] == 'image' && $image['#weight'] <= 0) {
        $vars['tb_methys_ii_first_image'] = drupal_render($image);
        unset($vars['content'][$key]);
        break;
      }
    }
    
    // Easy Social
    $vars['show_easy_social'] = FALSE;
    if (isset($vars['content']['easy_social_1'])) {
      $vars['show_easy_social'] = $vars['content']['easy_social_1'];
      $vars['content']['easy_social_1'] = NULL;
    }
  } 
  else{
    $vars['created_date'] = date('F d, Y', $vars['created']);
  }  
  
  
  $vars['page'] = ($vars['type'] == 'page') ? TRUE : FALSE;    
}

/**
 * Override of theme_breadcrumb().
 */
function tb_nex_breadcrumb($vars) {
  if (theme_get_setting('breadcrumb_display')) {
    $breadcrumb = $vars['breadcrumb'];
    $home_class = 'crumb-home';
    if (!empty($breadcrumb)) {
      $heading = '<h2 class="element-invisible">' . t("You are here:") . '</h2>';
      $separator = " &#187; ";
      $output = '';
      foreach ($breadcrumb as $key => $val) {
        if ($key == 0) {
          $output .= '<li class="crumb ' . $home_class . '">' . $val . '</li>';
        }
        else {
          $output .= '<li class="crumb"><span>' . $separator . '</span>' . $val . '</li>';
        }
      }
      return $heading . '<ol id="crumbs">' . $output . '</ol>';
    }
  }
  return '';
}