using System;
using System.Net.Http;
using System.Text;
using Arkia.Travel.Api.model;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Arkia.Travel.Api.service
{
	public class EmissionService
	{
        private readonly HttpClient _httpClient;
        private const string _apiKey = "AIzaSyDWUfviqvPXsyIgBIIyj9Gi_5wHs6wjvxE";


        public EmissionService(HttpClient httpClient)
        {
            _httpClient = httpClient;
      
        }

        public async Task<string> ComputeFlightEmissionsAsync(FlightRequest flightRequest)
        {

             string apiUrl = $"https://travelimpactmodel.googleapis.com/v1/flights:computeFlightEmissions?key={_apiKey}";

            try
            {
                // Convert all camel case letters to lower
                var settings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };
                // Convert FlightRequest object to JSON
                string jsonRequest = Newtonsoft.Json.JsonConvert.SerializeObject(flightRequest, settings);

                // Set up the HTTP request
                using (var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json"))
                {
                    // Make the API request
                    var response = await _httpClient.PostAsync(apiUrl, content);

                    // Check if the request was successful (HTTP status code 200)
                    if (response.IsSuccessStatusCode)
                    {
                        // Parse and return the response content
                        var responseContent = await response.Content.ReadAsStringAsync();
                        Console.WriteLine($"Server Response Content: {responseContent}");
                        return responseContent;
                    }
                    else
                    {
                        // Log or handle the error
                        Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine($"Exception: {ex.Message}");
                return null;
            }
        }
    }
}

