// See https://aka.ms/new-console-template for more information
using Entities.Models;
using Business.Concrete;
using System.Reflection.Metadata;
using DataAccess.Abstract;
using DataAccess.Concrete;

internal class Program
{
    private static void Main(string[] args)
    {
        Console.WriteLine("Hello, World!");

        User myuser = new User()
        {
            Id = 1,
            Firstname = "dad",
            Lastname = "sdaa",
            Email = "asd@da"

        };
        UserManager um = new UserManager(new UserDal());

        um.Create(myuser);
        Console.WriteLine(um.GetAll());
    }
}