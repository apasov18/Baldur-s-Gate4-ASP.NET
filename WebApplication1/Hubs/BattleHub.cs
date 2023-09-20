using Microsoft.AspNetCore.SignalR;

namespace WebApplication1.Hubs
{
    public class BattleHub:Hub
    {
        public async Task Move(string text)
        {
            await Clients.All.SendAsync("Move",text);
        }
    }
}
