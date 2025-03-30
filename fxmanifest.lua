fx_version 'cerulean'
game 'gta5'

author 'Your Name'
description 'LSPD Mobile Data Terminal'
version '1.0.0'

client_scripts {'client/*'}
server_script '@oxmysql/lib/MySQL.lua'
server_scripts {'server/*'}
shared_scripts {'@es_extended/imports.lua', 'config.lua'}

ui_page "web/dist/index.html"
files {'web/dist/index.html', 'web/dist/**/*'}

dependencies {
  'es_extended',
  "esx_policejob",
  'oxmysql',
}