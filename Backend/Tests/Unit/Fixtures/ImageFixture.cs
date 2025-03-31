public class ImageFixture : IDisposable
{
    private readonly MemoryStream _fileMemoryStream;
    private readonly string _uploadedDirectory;

    public MemoryStream Image {
        get => new MemoryStream(_fileMemoryStream.ToArray());
    }

    public ImageFixture()
    {
        // Dynamically construct the path to the Assets folder
        var projectRoot = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory));
        var assetsPath = Path.Combine(projectRoot, "Assets", "Test.gif");

        if (!File.Exists(assetsPath))
        {
            InfoMessagePrinter.TestImageNotFound(assetsPath);
        }

        using (FileStream fs = new FileStream(assetsPath, FileMode.Open, FileAccess.Read, FileShare.Read))
        {
            _fileMemoryStream = new MemoryStream();
            fs.CopyTo(_fileMemoryStream);
        }

        // Set up the path to the uploaded files directory
        _uploadedDirectory = Path.Combine(AppContext.BaseDirectory, "uploaded");
        if (!Directory.Exists(_uploadedDirectory))
        {
            Directory.CreateDirectory(_uploadedDirectory);
        }
    }

    public void Dispose()
    {
        CleanUpUploadedFiles();
         _fileMemoryStream?.Dispose();
    }

    private void CleanUpUploadedFiles()
    {
        if (Directory.Exists(_uploadedDirectory))
        {
            // Get all files in the uploaded directory
            // var files = Directory.GetFiles(_uploadedDirectory);
            // foreach (var file in files)
            // {
            //     try
            //     {
            //         File.Delete(file); // Delete each file
            //     }
            //     catch (Exception ex)
            //     {
            //         InfoMessagePrinter.FailedToDeleteFile(file, ex.Message);
            //     }
            // }

            try
            {
                // Directory.Delete(_uploadedDirectory, true); // Deletes the folder and all contents
            }
            catch (Exception ex)
            {
                InfoMessagePrinter.FailedToDeleteDirectory(_uploadedDirectory, ex.Message);
            }
        }
    }
}