namespace boardappserver.Controllers
{

    public class CustomResponseDTO<T> 
    {
        public T Data { get; set; }
        public List<String>? Errors { get; set; }
        public int StatusCode { get; set; }
        public string? Token { get; set; }

      
        public static CustomResponseDTO<T> Success(int statusCode, T data) 
        {
            return new CustomResponseDTO<T> { Data = data, StatusCode = statusCode };
        }

        public static CustomResponseDTO<T> Success(int statusCode, T data, string token)
        {
            return new CustomResponseDTO<T> { Data = data, StatusCode = statusCode, Token=token };
        }
        public static CustomResponseDTO<T> Success(int statusCode)
        {
            return new CustomResponseDTO<T> { StatusCode = statusCode };
        }
        public static CustomResponseDTO<T> Fail(int statusCode, List<string> errors)
        {
            return new CustomResponseDTO<T> { StatusCode = statusCode, Errors=errors };
        }
        public static CustomResponseDTO<T> Fail(int statusCode, List<string> errors, string token)
        {
            return new CustomResponseDTO<T> { StatusCode = statusCode, Token = token };
        }
        public static CustomResponseDTO<T> Fail(int statusCode, string error)
        {
            return new CustomResponseDTO<T> { StatusCode = statusCode, Errors = new List<string> { error } };
        }


    }
}
