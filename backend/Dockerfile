FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY ["PizzaApi.csproj", "."]
RUN dotnet restore "PizzaApi.csproj"

COPY . .

RUN dotnet build "PizzaApi.csproj" -c Release -o /app/build


FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=build /app/build .

EXPOSE 8080

ENTRYPOINT ["dotnet", "PizzaApi.dll"]