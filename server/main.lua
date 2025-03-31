ESX.RegisterServerCallback("esx_lspd_mdt:getname", function(source, cb)
  local xPlayer = ESX.GetPlayerFromId(source)
  local name = xPlayer.getName()
  cb(name)
end)

ESX.RegisterServerCallback("esx_lspd_mdt:getbadge", function(source, cb)
  local xPlayer = ESX.GetPlayerFromId(source)
  local result = MySQL.Sync.fetchAll("SELECT number FROM badge_numbers WHERE identifier = @identifier", {
    ["@identifier"] = xPlayer.identifier
  })
  local badgeNumber = result.number
  cb(badgeNumber)
end)

RegisterNetEvent("esx_lspd_mdt:setBadge")
AddEventHandler("esx_lspd_mdt:setBadge", function(badgeNumber, target)
  local xTarget = ESX.GetPlayerFromId(target)
  MySQL.Async.fetchAll("SELECT * FROM badge_numbers WHERE identifier = @identifier", {
    ["@identifier"] = xTarget.identifier
  }, function(result)
    if result and #result > 0 then
      MySQL.Async.execute("UPDATE badge_numbers SET number = @number WHERE identifier = @identifier", {
        ["@number"] = badgeNumber,
        ["@identifier"] = xTarget.identifier
      }, function(affectedRows)end)
    else
      MySQL.Async.execute("INSERT INTO badge_numbers (identifier, number) VALUES (@identifier, @number)", {
        ["@identifier"] = xTarget.identifier,
        ["@number"] = badgeNumber
      }, function(affectedRows)
  end)
    end
  end)
end)

RegisterNetEvent("esx_lspd_mdt:handleAction")
AddEventHandler("esx_lspd_mdt:handleAction", function(action, target)
  local xPlayer = ESX.GetPlayerFromIdentifier(target)
  if xPlayer then
    TriggerClientEvent("esx_lspd_mdt:"..action, target, action)
  end  
  local ident = (xPlayer and xPlayer.identifier) or (type(target) == "string" and target)
  if ident then
    -- Add to database regardless of player status
    MySQL.Async.execute("INSERT INTO actions_lspdmdt (identifier, action) VALUES (@identifier, @action)", {
      ["@identifier"] = ident,
      ["@action"] = action
    }, function(affectedRows)
      -- Database operation completed
    end)
  end
end)

RegisterNetEvent("esx_lspd_mdt:januszMachen")
AddEventHandler("esx_lspd_mdt:januszMachen", function()
  local xPlayer = ESX.GetPlayerFromId(source)
  local ident = xPlayer.identifier
  local result = MySQL.Sync.fetchAll("SELECT * FROM actions_lspdmdt WHERE identifier = @identifier", {
    ["@identifier"] = ident
  })
  for k,v in ipairs(result) do
    local action = v.action
    TriggerServerEvent("esx_lspd_mdt:"..action, ident)
  end
end)

