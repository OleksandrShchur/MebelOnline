namespace MebelOnline.Core.Mappings.Config
{
    public interface IMapper
    {
        TTarget Map<TSource, TTarget>(TSource source);
    }
}
