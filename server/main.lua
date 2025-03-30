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
      type = "open"
    })
    SetNuiFocus(true, true)
  end
end

function hasPermissions(category)

end