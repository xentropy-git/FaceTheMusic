var builder = DistributedApplication.CreateBuilder(args);

var apiService = builder.AddProject<Projects.FaceTheMusic_Api>("api");
/*
builder.AddProject<Projects.aspire_test_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithReference(apiService);
*/
builder.Build().Run();
