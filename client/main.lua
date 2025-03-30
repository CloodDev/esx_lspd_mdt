playerData = {}
Cooldown = 0
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

--[[###########
Functions
###########]] --
function openTablet()
  if hasPermissions() then
    SendNUIMessage({
      type = "officerData",
      name = playerData.name,
      badgeNumber = getBadgeNumber(NetworkGetNetworkIdFromEntity(PlayerPedId()))
    })
    SendNUIMessage({
      type = "open"
    })
    SetNuiFocus(true, true)
  end
end

function hasPermissions(category)
  local playerData = ESX.GetPlayerData()
  if playerData.job and playerData.job.name == "police" then
    return true
  end
  return false
end

function getBadgeNumber()
  return math.random(1000, 9999)
end