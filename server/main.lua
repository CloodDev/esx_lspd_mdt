ESX.RegisterServerCallback("lspdmdt:getname", function(source, cb)
  local xPlayer = ESX.GetPlayerFromId(source)
  local name = xPlayer.getName()
  cb(name)
end)

ESX.RegisterServerCallback("lspdmdt:getbadge", function(source, cb)
  local xPlayer = ESX.GetPlayerFromId(source)
  local result = MySQL.Sync.fetchAll("SELECT number FROM badge_numbers WHERE identifier = @identifier", {
    ["@identifier"] = xPlayer.identifier
  })
  local badgeNumber = result.number
  cb(badgeNumber)
end)

RegisterNetEvent("lspdmdt:setBadge")
AddEventHandler("lspdmdt:setBadge", function(badgeNumber, target)
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