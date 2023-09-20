using WebApplication1.Models;

namespace WebApplication1
{
    public static class DataBaseMoq
    {
        public static List<Room> Rooms { get; set; }
        static DataBaseMoq()
        {
            Rooms = new List<Room>();
            
        }
    }
}
