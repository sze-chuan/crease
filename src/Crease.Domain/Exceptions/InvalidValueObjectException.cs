﻿namespace Crease.Domain.Exceptions
{
    public class InvalidValueObjectException : Exception
    {
        public InvalidValueObjectException(string value, string valueObjectType)
            : base($"{valueObjectType} \"{value}\" is invalid.")
        {
        }
    }
}