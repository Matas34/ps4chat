public static class InfoMessagePrinter
{
    public static void DisplaySetupDBName(string message) => Console.WriteLine("SetupDB: " + message);
    public static void FailedToDeleteFile(string file, string message) => Console.WriteLine($"Failed to delete file {file}: {message}");
    public static void FailedToDeleteDirectory(string directory, string message) => Console.WriteLine($"Failed to delete directory {directory}: {message}");
    public static void TestImageNotFound(string message) => Console.WriteLine("Test image file not found: " + message);
}