fx_version 'cerulean'
game 'gta5'

author 'Your Name'
description 'LSPD Mobile Data Terminal'
version '1.0.0'

client_scripts {
  'client/main.lua',
}

server_scripts {
  'server/main.lua',
}

ui_page 'html/index.html'

files {
  'html/index.html',
  'html/css/style.css',
  'html/js/script.js',
  'html/img/*.png'
}

dependencies {
  'es_extended',
  "esx_policejob",
  'oxmysql',
}