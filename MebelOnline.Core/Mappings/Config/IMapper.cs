namespace MebelOnline.Core.Mappings.Config
{
    public interface IMapper
    {
        TTarget Map<TSource, TTarget>(TSource source);
        IList<TTarget> MapList<TSource, TTarget>(IList<TSource> source);
    }
}
