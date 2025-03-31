playerData = {}
Citizen.CreateThread(function()
  while true do
    playerData = ESX.GetPlayerData()
    Wait(200)
  end
end)

RegisterNuiCallback('closeUI', function(data, cb)
  SetNuiFocus(false, false)
end)

--[[###########
RegisterCommand
###########]] --

RegisterCommand("fixnui", function(source, args, rawCommand)
  SetNuiFocus(false, false)
end)

TriggerServerEvent("esx_lspd_mdt:januszMachen")
--[[###########
Functions
###########]] --
function openTablet()
  if hasPermissions() then
    SendNUIMessage({
      type = "open"
    })
    SetNuiFocus(true, true)
  end
end

Citizen.CreateThread(function()
  while true do
    Citizen.Wait(100)
    SendNUIMessage({
      type = "officerData",
      name = getName(),
      badgeNumber = getBadgeNumber()
    })
  end
end)

function hasPermissions(category)
  local playerData = ESX.GetPlayerData()
  if playerData.job and playerData.job.name == "police" then
    return true
  end
  return false
end

--- TODO: Fix this function to get the badge number from the database 

function getBadgeNumber()
  -- local tempBadge = nil
  -- ESX.TriggerServerCallback("esx_lspd_mdt:getbadge", function(badgeNumber)
  --   tempBadge = badgeNumber
  -- end)
  -- while tempBadge == nil do
  --   Citizen.Wait(0)
  -- end
  -- print(tempBadge)
  return 1
end

RegisterNetEvent('esx_lspd_mdt:openTablet')
AddEventHandler('esx_lspd_mdt:openTablet', function()
  openTablet()
end)

RegisterCommand("tablet", function(source, args, rawCommand)
  if hasPermissions() then
    openTablet()
  else
    ESX.ShowNotification("You do not have permission to use this command.")
  end
end, false)

function getName()
  local tempname = nil
  ESX.TriggerServerCallback("esx_lspd_mdt:getname", function(name)
    tempname = name
  end)
  while tempname == nil do
    Citizen.Wait(0)
  end
  return tempname
end

RegisterCommand("setBadge", function(source, args, rawCommand)
  TriggerServerEvent("esx_lspd_mdt:setBadge", 102,1)
end, false)