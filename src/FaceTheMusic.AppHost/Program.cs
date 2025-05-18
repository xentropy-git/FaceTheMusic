var builder = DistributedApplication.CreateBuilder(args);

var sql = builder.AddSqlServer("sql")
    .WithLifetime(ContainerLifetime.Persistent);

var db = sql.AddDatabase("database");

var apiService = builder.AddProject<Projects.FaceTheMusic_Api>("api")
    .WithReference(db)
    .WaitFor(db);
/*
builder.AddProject<Projects.aspire_test_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithReference(apiService);
*/
builder.Build().Run();
